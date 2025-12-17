import React, { Component } from 'react';
import type { ErrorInfo } from 'react';

type State = { hasError: boolean; error?: Error | null; info?: ErrorInfo | null };

export default class ErrorOverlay extends Component<React.PropsWithChildren<{}>, State> {
  state: State = { hasError: false, error: null, info: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({ error, info });
    // also log to console
    // eslint-disable-next-line no-console
    console.error('Captured error in ErrorOverlay:', error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children as any;

    return (
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', color: '#fff', padding: 24, zIndex: 99999, overflow: 'auto' }}>
        <h2 style={{ marginTop: 0 }}>Runtime error</h2>
        <pre style={{ whiteSpace: 'pre-wrap', fontSize: 13 }}>{String(this.state.error?.stack || this.state.error)}</pre>
        {this.state.info && <pre style={{ whiteSpace: 'pre-wrap', fontSize: 12 }}>{String(this.state.info.componentStack)}</pre>}
      </div>
    );
  }
}
