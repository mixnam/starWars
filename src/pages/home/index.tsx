import * as React from 'react'
import {
    Button,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    CardActionArea,
    Typography,
    Skeleton,
    Pagination,
    Box,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { Link as RouterLink } from 'react-router-dom'
import { animated, to, useSprings } from '@react-spring/web'
import { useCharacters } from 'src/providers/characters'
import Page from '../page'
import { isCharacter } from 'src/models/character'

const StyledCard = styled(Card)`
    position: relative;
    will-change: transform, opacity;
`

const AnimatedCard = animated(StyledCard)
const AnimatedBox = animated(Box)

const Home: React.FunctionComponent = () => {
    const {
        isLoading,
        page,
        totalPage,
        data,
        goToPage,
    } = useCharacters()

    const activeRef = React.useRef<number>()

    const [s, api] = useSprings(isLoading ? 10 : data?.length || 0, () => ({
        toX: 0,
        toY: 0,
        zIndex: 0,
        scale: 1,
        rotate: 0,
        opacity: 1,
        config: {
            mass: 5,
            tension: 500,
            friction: 80,
        }
    }), [data])

    const cardClickHandler = React.useCallback<React.MouseEventHandler<HTMLDivElement>>(event => {
        const target = event.currentTarget
        let i: number | undefined = Number.parseInt(target.dataset['inx'] as string)
        const active = activeRef.current
        if (active === i) {
            i = undefined
        }
        const bcr = target.getBoundingClientRect()

        const middleWidth = window.innerWidth / 2
        const middleHeight = window.innerHeight / 2
        const toX = middleWidth - bcr.x - bcr.width / 2
        const toY = middleHeight - bcr.y - bcr.height / 2

        api.start(idx => idx === i ? {
            toX: toX,
            toY: toY,
            zIndex: 100,
            scale: 2,
            rotate: 180,
            opacity: 0,
            immediate: key => key === 'zIndex',
        } : {})

        api.start(idx => idx === active ? {
            to: async next => {
                await next({
                    zIndex: 50,
                    immediate: true
                })
                await next({
                    rotate: 0,
                    opacity: 1,
                    toX: 0,
                    toY: 0,
                    scale: 1,
                })
                await next({
                    zIndex: 1,
                    immediate: true
                })
            }
        } : {})
        activeRef.current = i
    }, [s, api])

    const cardMouseEnterHandler = React.useCallback<React.MouseEventHandler<HTMLDivElement>>(event => {
        const i = Number.parseInt(event.currentTarget.dataset['inx'] as string)
        api.start(idx => (i === idx && i !== activeRef.current) ? {
            scale: 1.05
        } : {})
    }, [s, api])

    const cardMouseLeaveHandler = React.useCallback<React.MouseEventHandler<HTMLDivElement>>(event => {
        const i = Number.parseInt(event.currentTarget.dataset['inx'] as string)
        api.start(idx => (i === idx && i !== activeRef.current) ? {
            scale: 1
        } : {})
    }, [s, api])

    const changePageHandler = React.useCallback((_: React.ChangeEvent<unknown>, value: number) => {
        goToPage(value)
    }, [goToPage])

    const data$ = isLoading ? new Array(10).fill(null) : data

    return (
        <Page>
            <Grid container spacing={2} columns={60}>
                {
                    data$?.map((character, i) => (
                        <Grid item lg={12} md={15} sm={20} xs={30} key={character?.name || i}>
                            <AnimatedBox sx={{
                                position: "relative",
                                perspective: "800px"
                            }} style={{
                                zIndex: s[i].zIndex,
                            }}>
                                <AnimatedCard data-inx={i} style={{
                                    transform: to([s[i].toX, s[i].toY, s[i].scale, s[i].rotate], (x, y, s, r) => `translate(${x}px,${y}px) scale(${s}) rotateY(${r}deg)`),
                                    opacity: s[i].opacity,
                                    zIndex: s[i].zIndex,
                                }} onClick={cardClickHandler} onMouseEnter={cardMouseEnterHandler} onMouseLeave={cardMouseLeaveHandler}>
                                    <CardActionArea>
                                        {isLoading ? <Skeleton height="280px" variant="rectangular" /> : <CardMedia component="img" height="100%" image={character.imgUrl} />}
                                        <CardContent >
                                            <Typography>
                                                {isLoading ? <Skeleton width="70%" /> : character.name.toLowerCase()}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </AnimatedCard>
                                {isCharacter(character) &&
                                    <AnimatedCard data-inx={i} style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        minHeight: '100%',
                                        minWidth: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        transform: to([s[i].toX, s[i].toY, s[i].scale, s[i].rotate], (x, y, s, r) => `translate(${x}px,${y}px) scale(${s}) rotateY(${180 + r}deg)`),
                                        opacity: to([s[i].opacity], o => 1 - o),
                                        zIndex: to([s[i].zIndex, s[i].opacity], (z, o) => 1 - o === 1 ? z + 1 : z - 1),
                                    }} onClick={cardClickHandler}>
                                        <CardContent>
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
                                        </CardContent>
                                        <CardActions sx={{
                                            justifyContent: 'center',
                                            padding: '25px',
                                        }}>
                                            <Button
                                                sx={{
                                                    textTransform: 'none',
                                                    color: 'black',
                                                    borderColor: 'black',
                                                }}
                                                component={RouterLink}
                                                variant='outlined'
                                                to={`/character/${character.id}`}
                                                size="small">
                                                learn more
                                            </Button>
                                        </CardActions>
                                    </AnimatedCard>
                                }
                            </AnimatedBox>
                        </Grid>
                    ))
                }
            </Grid>
            <Pagination count={totalPage} page={page} sx={{
                margin: "32px 0"
            }} onChange={changePageHandler} />
        </Page>

    )
}

export default Home
