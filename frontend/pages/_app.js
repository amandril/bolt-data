import { Component } from "react/cjs/react.production.min";
import Router from "next/router";
import Page from "../components/Page";
import { ApolloProvider } from "@apollo/client";
import withData from "../lib/withData";
import { onError } from "@apollo/link-error";

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}

// tell nextjs to fetch all the queries in the children components
MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(MyApp);
