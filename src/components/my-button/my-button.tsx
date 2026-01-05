import { Component, Prop, h, Event, EventEmitter, Host } from '@stencil/core';
// import colours from '../../utils/colours';

@Component({
  tag: 'app-button',
  shadow: true,
  styles: `
    :host {
      display: inline-block;
      text-transform: uppercase;

      /* Colour variables */
      --primary: #1a8500;
      --primary-hover: #006100;
      --primary-light: #c6e7c1;
      --primary-light-hover: #A0D899;
      --secondary800: #2d3748;
      --secondary700: #4a5568;
      --error: #f44336;
      --error-hover: #D2190B;
      --white: #ffffff;
    }

    button, a {
      border-radius: 100px;
      font-family: 'Open Sans', sans-serif;
      font-weight: 700;
      letter-spacing: 0.5px;
      white-space: nowrap;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border: none;
      text-decoration: none;
      pointer-events: auto;
      transition: background-color 0.15s ease, color 0.15s ease;
    }

    button:disabled {
      opacity: 0.6;
      pointer-events: none;
    }

    /* Sizes */
    .small { font-size: 11px; padding: 4px 12px; }
    .medium { font-size: 14px; padding: 6px 18px; }
    .large { font-size: 14px; padding: 8px 22px; }
    .xlarge { font-size: 20px; padding: 10px 26px; }

    /* Variants */
    .primary {
      background-color: var(--primary);
      color: var(--white);
    }
    .primary:hover {
      background-color: var(--primary-hover);
    }

    .lightPrimary {
      background-color: var(--primary-light);
      color: var(--primary);
    }
    .lightPrimary:hover {
      background-color: var(--primary-light-hover);
    }

    .outline {
      background-color: transparent;
      border: 2px solid var(--primary);
      color: var(--primary);
    }
    .outline:hover {
      background-color: var(--primary);
      color: var(--white);
    }

    .error {
      background-color: var(--error);
      color: var(--white);
    }
    .error:hover {
      background-color: var(--error-hover);
    }

    .blackVariant {
      background-color: var(--secondary800);
      color: var(--white);
    }
    .blackVariant:hover {
      background-color: var(--secondary700);
    }

    .blackVariantSecondary {
      background-color: var(--white);
      color: var(--secondary800);
      border: 2px solid var(--secondary800);
    }

    /* Icon + spinner */
    .icon {
      margin-right: 8px;
      color: inherit;
    }

    .spinner {
      width: 10px;
      height: 10px;
      border: 3px solid rgba(255,255,255,0.4);
      border-top-color: var(--white);
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `,
})
export class MyButton {
  /** Label text */
  @Prop() label!: string;

  /** Size */
  @Prop() size: 'small' | 'medium' | 'large' | 'xlarge' = 'medium';

  /** Variants */
  @Prop() primary = true;
  @Prop() lightPrimary = false;
  @Prop() outline = false;
  @Prop() error = false;
  @Prop() blackVariant = false;
  @Prop() blackVariantSecondary = false;

  /** States */
  @Prop() disabled = false;
  @Prop() loading = false;

  /** Link */
  @Prop() href?: string;
  @Prop() externalLink = false;

  /** Icon class */
  @Prop() icon?: string;

  @Prop() width?: string | number;

  /** Click event */
  @Event() buttonClick!: EventEmitter<void>;

  private handleClick = () => {
    if (!this.disabled && !this.loading) {
      this.buttonClick.emit();
    }
  };

  render() {
    const Tag = this.href ? 'a' : 'button';

    const classes = {
      [this.size]: true,
      primary: this.primary,
      lightPrimary: this.lightPrimary,
      outline: this.outline,
      error: this.error,
      blackVariant: this.blackVariant,
      blackVariantSecondary: this.blackVariantSecondary,
    };

    return (
      <Host style={{ width: this.width ? (typeof this.width === 'number' ? `${this.width}px` : this.width) : 'auto' }}>
        <Tag
          class={classes}
          href={this.href}
          target={this.externalLink || this.href?.startsWith('http') ? '_blank' : '_self'}
          disabled={!this.href ? this.disabled : undefined}
          onClick={this.handleClick}
          style={{ textTransform: 'uppercase', width: this.width ? (typeof this.width === 'number' ? `${this.width}px` : this.width) : 'auto' }}
        >
          {this.icon && <i class={`icon ${this.icon}`}></i>}
          {!this.loading ? this.label : <span class="spinner" />}
        </Tag>
      </Host>
    );
  }
}
