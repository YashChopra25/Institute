import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {  FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
const Questions = ({ descriptive, className }) => {
    const SavedAnserInLocalSTorage = (usedFor, title, value) => {
        const descriptive = JSON.parse(localStorage.getItem(usedFor))
        if (descriptive == null) {
            localStorage.setItem(usedFor, JSON.stringify([{ title, value }]))
        } else {
            let isExit = false;
            descriptive.map((item) => {
                if (item.title == title) {
                    item.value = value
                    isExit = true
                }
            })
            if (!isExit) {
                descriptive.push({ title, value })
            }
            localStorage.setItem(usedFor, JSON.stringify(descriptive))
        }

    }
    return (
        <div className={"w-11/12 h-full" + className}>
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