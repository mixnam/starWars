import * as React from 'react'
import { Container, Stack, Typography } from '@mui/material'

interface Props {
    children: React.ReactElement | React.ReactElement[]
}

const Page: React.FunctionComponent<Props> = ({ children }) => {
    return (
        <Container sx={{
            minHeight: '100vh',
        }}>
            <Stack alignItems="center">
                <Typography variant="h1" textAlign="center" margin="36px 0">
                    star wars
                </Typography>
                {children}
            </Stack>
        </Container>
    )
}

export default Page
