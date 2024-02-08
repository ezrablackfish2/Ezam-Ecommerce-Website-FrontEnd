import React from 'react';
import { Link } from 'react-router-dom';

function Paginate({ pages, page, keyword = '', isAdmin = false }) {
    if (keyword) {
        keyword = keyword.split('?keyword=')[1].split('&')[0];
    }

    return (
        pages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center' , fontFamily: "itim"}}>
                {[...Array(pages).keys()].map((x) => (
                    <Link
                        key={x + 1}
                        to={{
                            pathname: !isAdmin ? '/' : '/admin/productlist/',
                            search: `?keyword=${keyword}&page=${x + 1}`
                        }}
                        style={{
                            backgroundColor: x + 1 === page ? '#000000' : '#fff',
                            color: x + 1 === page ? '#fff' : '#000',
                            padding: '5px 10px',
                            margin: '0 5px',
                            textDecoration: 'none'
                        }}
                    >
                        {x + 1}
                    </Link>
                ))}
            </div>
        )
    );
}

export default Paginate;

