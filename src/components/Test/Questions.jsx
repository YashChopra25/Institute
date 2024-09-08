import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Checkbox, FormControl, FormControlLabel } from '@mui/material';
const Questions = ({ descriptive, className }) => {
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
                                                value="end"
                                                control={<Checkbox />}
                                                label={option?.text}
                                                labelPlacement="end"
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