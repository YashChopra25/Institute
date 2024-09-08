import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Checkbox, FormControl, FormControlLabel } from '@mui/material';
const Questions = ({ descriptive, className }) => {
    const SavedAnserInLocalSTorage = (title, value) => {
        console.log(title, value)
        const descriptive = JSON.parse(localStorage.getItem(title))
        if (descriptive == null) {
            localStorage.setItem(title, JSON.stringify({ count: 1 }))
        } else {
            if (value) {
                const prevValue = descriptive?.count + 1
                localStorage.setItem(title, JSON.stringify({ count: prevValue }))
            }
            else {
                const prevValue = (descriptive?.count) ? descriptive?.count - 1 : 0
                localStorage.setItem(title, JSON.stringify({ count: prevValue }))
            }
        }

    }
    return (
        <div className={"w-3/4 h-full " + className}>
            <Card className='w-full min-h-full'>
                <CardContent>
                    <Typography gutterBottom variant="h4" component="div">
                        {descriptive?.name}
                    </Typography>
                    {
                        descriptive?.questions?.map((question, index) => (
                            <React.Fragment key={question?.title}>
                                <Typography gutterBottom variant="h6" component="div">
                                    {index + 1}. {question?.title}
                                </Typography>
                                <FormControl className='mb-3'>
                                    {
                                        question?.options?.map((option) => (
                                            <FormControlLabel
                                                key={option?.id}
                                                value={question?.title?.split(" ")?.join("-")}
                                                control={<Checkbox />}
                                                label={option?.text}
                                                labelPlacement="end"
                                                onChange={(e) => SavedAnserInLocalSTorage(e?.target?.value.toLowerCase(), e.target.checked)}
                                            />
                                        ))
                                    }
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