import * as React from 'react'
import {
    Breadcrumbs,
    Skeleton,
    Grid,
    Link,
    Typography,
    Card,
    CardMedia,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Page from '../page'
import { useCharacter } from 'src/providers/character'

type Params = 'id'

const Character: React.FunctionComponent = () => {
    const { id } = useParams<Params>()

    const {
        character,
    } = useCharacter(Number.parseInt(id as string))

    return (
        <Page>
            <Breadcrumbs aria-label="breadcrumbs" sx={{
                alignSelf: "start"
            }}>
                <Link color="inherit" underline="hover" component={RouterLink} to="/">
                    Home
                </Link>
                <Typography color="text.primary">
                    {character ? character.name : <Skeleton width={'100px'} />}
                </Typography>
            </Breadcrumbs>
            <Grid container spacing={3} mt={3} justifyContent="center">
                <Grid item lg={3}>
                    <Card>
                        <CardMedia component="img" image={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} />
                    </Card>
                </Grid>
                <Grid item lg={3}>
                    {character && (
                        <>
                            <Typography variant='body1'>
                                name:&nbsp;
                                <Typography variant='caption' color={'darkgrey'}>
                                    {character.name}
                                </Typography>
                            </Typography>
                            <Typography variant='body1'>
                                birthday:&nbsp;
                                <Typography variant='caption' color={'darkgrey'}>
                                    {character.birth_year}
                                </Typography>
                            </Typography>
                            <Typography variant='body1'>
                                eye color:&nbsp;
                                <Typography variant='caption' color={'darkgrey'}>
                                    {character.eye_color}
                                </Typography>
                            </Typography>
                            <Typography variant='body1'>
                                gender:&nbsp;
                                <Typography variant='caption' color={'darkgrey'}>
                                    {character.gender}
                                </Typography>
                            </Typography>
                            <Typography variant='body1'>
                                hair color:&nbsp;
                                <Typography variant='caption' color={'darkgrey'}>
                                    {character.hair_color}
                                </Typography>
                            </Typography>
                            <Typography variant='body1'>
                                height:&nbsp;
                                <Typography variant='caption' color={'darkgrey'}>
                                    {character.height}
                                </Typography>
                            </Typography>
                            <Typography variant='body1'>
                                mass:&nbsp;
                                <Typography variant='caption' color={'darkgrey'}>
                                    {character.mass}
                                </Typography>
                            </Typography>
                            <Typography variant='body1'>
                                skin color:&nbsp;
                                <Typography variant='caption' color={'darkgrey'}>
                                    {character.skin_color}
                                </Typography>
                            </Typography>
                        </>
                    )}
                </Grid>
            </Grid>
        </Page>
    )
}

export default Character
