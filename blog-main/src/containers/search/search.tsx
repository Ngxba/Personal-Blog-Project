import React, { useReducer, useEffect, useRef, useState } from "react";
import SearchReducer, { initialState } from "./search-reducer";
import { useStaticQuery, graphql } from "gatsby";
import { Scrollbars } from "react-custom-scrollbars";
import { rebuildIndex } from "./search-index-builder-function";
import PostList from "../../components/post-list/post-list";
import {
  SearchWrapper,
  SearchForm,
  SearchResult,
  NoResult,
} from "./search.style";

function Search(props: any) {
  const [state, dispatch] = useReducer(SearchReducer, initialState);

  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM D, YYYY")
              title
              description
              tags
              cover {
                childImageSharp {
                  fluid(maxWidth: 62, maxHeight: 62, quality: 90) {
                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  const dataset = data.allMarkdownRemark.edges;

  /**
   * handles the input change and perfom a search with js-search
   * in which the results will be added to the state
   */
  const searchData = (e: any) => {
    const { search } = state;
    const queryResult = search.search(e.target.value);
    dispatch({
      type: "SET_SEARCH_QUERY",
      payload: { searchQuery: e.target.value, searchResults: queryResult },
    });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const inputRef:any = useRef(null);
  const isFocus:boolean = props.isFocus

  useEffect(() => {
    if (isFocus) {
      inputRef.current.focus();
    }
  }, [isFocus]);

  useEffect(() => {
    if (dataset.length !== 0) {
      let data: any = [];
      dataset.forEach(({ node }: any) => {
        let formatedData = {
          ...node.frontmatter,
          slug: node.fields.slug,
        };
        data.push(formatedData);
      });

      dispatch({ type: "SET_DATA", payload: data });
      const dataToSearch = rebuildIndex(data);
      if (dataToSearch) {
        dispatch({
          type: "SET_SEARCH",
          payload: dataToSearch,
        });
      }
    }
  }, [dataset]);

  const { searchResults, searchQuery } = state;
  const queryResults = searchResults;

  return (
    <SearchWrapper>
      <SearchForm onSubmit={handleSubmit}>
        <input
          id="Search"
          value={searchQuery}
          onChange={searchData}
          placeholder="Enter Your Search Topic"
          ref={inputRef}
        />
      </SearchForm>
      <SearchResult>
        {queryResults.length == 0 && searchQuery !== "" ? (
          <NoResult>No result found</NoResult>
        ) : (
          ""
        )}

        {queryResults.length !== 0 && (
          <Scrollbars
            autoHeight={true}
            autoHeightMax={505}
            className="search-scrollbar"
          >
            {queryResults.map((item: any) => {
              return (
                <PostList
                  key={item.slug}
                  title={item.title}
                  url={item.slug}
                  image={
                    item.cover == null ? null : item.cover.childImageSharp.fluid
                  }
                  date={item.date}
                  tags={item.tags}
                />
              );
            })}
          </Scrollbars>
        )}
      </SearchResult>
    </SearchWrapper>
  );
}

export default Search;
