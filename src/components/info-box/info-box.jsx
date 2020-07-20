import React from 'react'; 

import { Card, CardContent, Typography} from '@material-ui/core';

export default function InfoBox({ title, cases, total}) {
    return (
        <Card>
            <CardContent>
                <Typography color="textSecondary">{title}</Typography>
                <Typography color="textSecondary">{cases}</Typography>
                <Typography color="textSecondary">{total}</Typography>
            </CardContent>
        </Card>
    )
}