import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Checkbox, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
const Questions = ({ descriptive, className }) => {
    /**
     * Saves the answer to the local storage
     * @param {string} usedFor - The key to use for the local storage
     * @param {string} title - The title of the answer
     * @param {string} value - The value of the answer
     * @returns {void}
     */
    const SavedAnserInLocalSTorage = (usedFor, title, value) => {
        // Check if the key already exists in the local storage
        const descriptive = JSON.parse(localStorage.getItem(usedFor))
        if (descriptive == null) {
            // If not, create a new array with the answer
            localStorage.setItem(usedFor, JSON.stringify([{ title, value }]))
        } else {
            // If the key does exist, check if the answer already exists in the array
            let isExit = false;
            descriptive?.map((item, index) => {
                if (item.title == title) {
                    // If the answer already exists, update the value
                    item.value = value
                    isExit = true
                }
            })
            if (!isExit) {
                // If the answer does not exist, add it to the array
                descriptive.push({ title, value })
            }
            // Save the array back to the local storage
            localStorage.setItem(usedFor, JSON.stringify(descriptive))
        }

    }
    return (
        <div className={"w-11/12 h-full " + className}>
            <Card className='w-full min-h-full'>
                <CardContent>
                    <Typography gutterBottom variant="h4" component="div">
                        {descriptive?.name}
                    </Typography>
                    <Typography marginLeft={"auto"} display={"flex"} justifyContent={"space-between"} gap={1} variant="div" color="text.secondary" sx={{ textAlign: "center" }} width={"50%"} paddingLeft={"100px"}>
                        <Typography variant='span' className='capitalize'>one</Typography>
                        <Typography variant='span' className='capitalize'>two</Typography>
                        <Typography variant='span' className='capitalize'>three</Typography>
                        <Typography variant='span' className='capitalize'>four</Typography>
                        <Typography variant='span' className='capitalize pr-7'>five</Typography>
                    </Typography>

                    {
                        descriptive?.questions?.map((question, index) => (
                            <React.Fragment key={question?.title}>
                                <Typography gutterBottom variant="h6" component="div">
                                    {index + 1}. {question?.title}
                                </Typography>
                                <FormControl className='mb-3 w-full'>
                                    <ol type='A' className='list-disc pl-10 w-full'>
                                        {
                                            question?.options?.map((option) => (
                                                <li key={option?.text} className='flex items-center justify-between w-full '>
                                                    <Typography gutterBottom component="div" variant='li' >
                                                        {option?.text}
                                                    </Typography>
                                                    <RadioGroup
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        name={option?.text}
                                                        className='flex flex-row gap-12'

                                                    >
                                                        {
                                                            Array.from({ length: 5 }).map((_, index) => (
                                                                <FormControlLabel
                                                                    key={option?.text + index}
                                                                    control={<Radio />}
                                                                    value={index + 1}
                                                                    name={option?.text}
                                                                    onClick={(e) => SavedAnserInLocalSTorage(question?.title?.split(" ")?.join("-").toLowerCase(), e.target.name, e.target.value)}
                                                                />
                                                            ))
                                                        }
                                                    </RadioGroup>
                                                </li>
                                            ))
                                        }
                                    </ol>
                                </FormControl>
                            </React.Fragment>
                        ))
                    }

                </CardContent>
            </Card>
        </div>
    )
}

export default Questions