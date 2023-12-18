import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import Category from './Category';

export default function PostBigImg({ post }) {
  return (
    <Container
      maxWidth="lg"
      style={{
			  backgroundColor: 'var(--surface-card)',
			  borderRadius: 'var(--border-radius)',
			  padding: '1rem',
			  marginTop: '1rem',
      }}
    >
      <div
        style={{
				  borderBottom: '1px solid grey',
				  marginBottom: '.5rem',
				  paddingBottom: '.5rem',

				  maxWidth: 'calc(1180px - 10rem)',
        }}
      >
        <Category category={post.category} />
        <Link
          to={`post/${post.id}`}
          style={{
					  fontWeight: 'bolder',
					  fontSize: '2rem',
					  textDecoration: 'none',
					  color: 'inherit',
					  marginTop: '2rem',
          }}
        >
          {post.title}
        </Link>

        <div
          style={{
					  display: 'flex',
					  justifyContent: 'space-between',
					  fontSize: '.8rem',
          }}
        >
          <Link
            style={{
						  display: 'flex',
						  textDecoration: 'none',
						  color: 'inherit',
            }}
            to={{
						  pathname: `/author/${post.authorId}`,
            }}
          >
            <div style={{ fontWeight: 'bold' }}>
              {post.authorName}
              {post.authorSurname}
&nbsp;
            </div>
            {new Date(post.createdAt).toLocaleDateString('en-EN', {
						  year: 'numeric',
						  month: 'long',
						  day: 'numeric',
            })}
          </Link>
          <p style={{ margin: '0', userSelect: 'none' }}>
            Views:
            {post.views}
          </p>
        </div>
      </div>

      <Link
        to={{
				  pathname: `post/${post.id}`,
				  state: { postData: post },
        }}
        style={{
				  display: 'block',
				  borderRadius: '1.5rem',
				  overflow: 'hidden',
				  lineHeight: '0',
        }}
      >
        {' '}
        <Box
          component="img"
          src={post.image}
          alt="zdjęcie"
          sx={{
					  width: '100%',
					  objectFit: 'cover',

					  maxHeight: {
					    lg: 400, md: 300, sm: 200, xs: 100,
            },
          }}
        />
      </Link>
    </Container>
  );
}
