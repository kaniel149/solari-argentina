import React from 'react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="flex items-center justify-center min-h-[400px] p-8">
          <div className="bg-zinc-900 border border-white/[0.09] rounded-xl p-8 max-w-md text-center space-y-4">
            <div className="text-4xl">&#x26A0;&#xFE0F;</div>
            <h2 className="text-xl font-semibold text-zinc-100">
              Something went wrong
            </h2>
            <p className="text-sm text-zinc-500">
              This page encountered an error
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-4 py-2 bg-sky-500/10 hover:bg-sky-500/15 text-sky-400 border border-sky-500/20 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
