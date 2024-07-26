<template>
  
  <h1>Google login for development purposes</h1>
    <h2>How it works?</h2>
    <ol>
      <li class="pinky">
        <p>
          Register this url in your Google Cloud Console app as allowed origin
        </p>
        <pre>https://cv-builder-swagger-helper.deno.dev</pre>
      </li>
      <li class="yellowy">
        <p>Navigate to this page from where you need (for example Swagger) with query param</p>
        <pre>{{"<ahref={`https://cv-builder-swagger-helper.deno.dev/?clientId=\${config.VITE_GOOGLE_CLIENT_ID}`}>Sign-in with google</ahref=>`"}}</pre>
        <p>P.S.</p>
        <p>Example above use jsx syntax</p>
      </li>
      <li class="greeny">
        <p>After success login the Copy button will appear with your credential/code from Google</p>
      </li>
    </ol>
</template>
