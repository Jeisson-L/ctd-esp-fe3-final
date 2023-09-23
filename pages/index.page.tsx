import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import { getComics } from 'dh-marvel/services/marvel/marvel.service';
import { Data } from 'interface/comic';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import { useRouter } from 'next/router';
import { ComicBase } from 'dh-marvel/components/comics/comic.component';
import LayoutGeneral from 'dh-marvel/components/layouts/layout-general';


interface Props {
    data: Data
}

const PAGE_SIZE = 12;

const Index: NextPage<Props> = ({ data }) => {
    const router = useRouter()

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        router.push(`/?page=${page}`)
    };


    return (
        <LayoutGeneral>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <BodySingle title={"Marvel Comics Store"}>
                <Grid item xs={12} sx={{ alignSelf: "flex-end" }}>
                    <Pagination
                        count={Math.ceil((data?.total || 0) / PAGE_SIZE)}
                        onChange={handlePageChange}
                        variant="outlined"
                        shape="rounded"
                    />
                </Grid>
                <Grid container spacing={2} display={"flex"} >
                    {data?.results?.map((item) => (
                        <Grid item xs={12} md={3} sm={6} key={item.id} display={"flex"} justifyContent={"center"}>
                            <ComicBase comic={item} showDetailButton={true} isInStock={true} showBuyButton={true} />
                        </Grid>
                    ))}

                </Grid>
                <Grid item xs={12} sx={{ alignSelf: "flex-end" }}>
                    <Pagination
                        count={Math.ceil((data?.total || 0) / PAGE_SIZE)}
                        onChange={handlePageChange}
                        variant="outlined"
                        shape="rounded"
                    />
                </Grid>
            </BodySingle >
        </LayoutGeneral>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ query, res }) => {
    const { page = 1 } = query;

    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    )
    const comics = await getComics(Number(page), Number(PAGE_SIZE))

    return {
        props: {
            data: comics.data
        }
    }

}

export default Index
