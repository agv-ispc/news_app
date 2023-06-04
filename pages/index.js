import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import PageLayout from '../components/PageLayout.jsx'
import { useEffect, useState } from 'react'

export default function Home({ articles }) {

  return (
    <PageLayout title='NewsApp - Home'>
      <div className={styles.container}>
        {articles.length === 0 && <p>No tenemos articulos </p>}
        {articles.length > 0 && articles.map((article, index) => (
          <div key={index}>
            <Image
              alt={`Image for the article ${article.title}`}
              src={article.urlToImage}
              width={500}
              height={300}
              layout='responsive'
            />
            <h2>{article.title}</h2>
            <p>{article.description}</p>
          </div>
        ))}
      </div>
    </PageLayout>
  )
}

// N requests -> se ejecuta 1 vez en build time (o para refrezacar la pagina)
export async function getStaticProps (context) { 
  const response = await fetch('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=1360a7c16f8248dc8beaaaa850602c7a')
  const { articles } = await response.json()
  return {
    props: {
      articles
    }
  }
}

// N requests -> se jecuta N veces
// Para datos que necesitas que sean MUY live
// tiene demasiados datos dinamicos

/* export async function getServerSideProps (context) { 
  const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=1360a7c16f8248dc8beaaaa850602c7a')
  const { articles } = await response.json()
  return {
    props: {
      articles
    }
  }
} */