import ReactDOM from 'react-dom';
import React from 'react';
import reactToWebComponent from 'react-to-webcomponent';
import { ThemeProvider } from '@mui/system';
import createCache from '@emotion/cache';
import { StyledEngineProvider } from '@mui/material';
import { createRoot } from 'react-dom/client';
import { CacheProvider } from '@emotion/react';
import { ProvidersProps } from './types';

export function ThemeProviders(props: ProvidersProps) {
  return (
    <StyledEngineProvider injectFirst={false}>
      <ThemeProvider theme={props.theme}>{props.children}</ThemeProvider>
    </StyledEngineProvider>
  );
}

/**
 * Web component wrapper that wrap the react component into a shadow dom web component
 * shadow dom is used to isolate your custom component from element styles
 */
export function WebComponentWrapper(
  NAME: string,
  Component: (props) => JSX.Element,
  CustomProviders: (props) => React.ReactElement<typeof ThemeProviders>
): void {
  class WebComponent extends reactToWebComponent(Component, React, ReactDOM) {
    props = {};

    //https://codesandbox.io/s/shadow-dom-rki9k5?from-embed=&file=/index.tsx:1159-1188
    connectedCallback() {
      const shadowRoot = super.attachShadow({ mode: 'open' });
      const mountPoint = document.createElement('span');
      const emotionRoot = document.createElement('style');

      mountPoint.id = NAME;
      shadowRoot.appendChild(mountPoint);
      shadowRoot.appendChild(emotionRoot);
      const cache = createCache({
        key: 'css',
        prepend: true,
        container: emotionRoot,
      });

      if ((Component as any).propTypes) {
        this.props = Object.keys((Component as any).propTypes).reduce(
          (obj, item) => {
            return {
              ...obj,
              [`${item}`]: super.getAttribute(item),
            };
          },
          {}
        );
      }
      const root = createRoot(mountPoint); // createRoot(container!) if you use TypeScript

      root.render(
        <CacheProvider value={cache}>
          <CustomProviders>
            <Component {...this.props} />
          </CustomProviders>
        </CacheProvider>
      );
    }
  }

  if (!customElements.get(NAME)) {
    customElements.define(NAME, WebComponent as any);
  }
}
