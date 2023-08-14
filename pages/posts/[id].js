import React from 'react';
import API from '@/libs/api';


function post({Post:post}) {
  return (
    <div>{post?.content}</div>
  )
}

export default post


export async function getStaticPaths(ctx) {
  return {
      paths: [], //indicates that no page needs be created at build time
      fallback: true //indicates the type of fallback
  }
}

export async function getStaticProps(ctx) {
  try {
    const { params: { id } } = ctx;

    console.log(id, 'id')
    const fetchData = await API.get(`tweets/${id}/`);
    if (!fetchData.data) {
        return {
            notFound: true
        };
    }
    return {
      props: {
          Post: fetchData.data,
      },
      revalidate: 60
    }
  } catch (error) {
    console.log(error, 'error')
    return {
      notFound: true
    }
  }

}