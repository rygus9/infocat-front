import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html className="bg-myBlack" lang="ko">
        <Head>
          {/* favicon */}
          <link rel="icon" type="image/png" sizes="32x32" href="/image/favi/favicon.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/image/favi/favicon.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/image/favi/favicon.png" />
          {/* SEO */}
          <meta name="keywords" content="Cuzz, cuzzlog, Programming, FrontEnd" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
