import './Button.css';

function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  className = '',
  href,
  ...props
}) {
  const buttonClass = `btn btn-${variant} btn-${size} ${className}`.trim();

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="btn-icon left">{icon}</span>}
      <span className="btn-text">{children}</span>
      {icon && iconPosition === 'right' && <span className="btn-icon right">{icon}</span>}
    </>
  );

  if (href) {
    return (
      <a href={href} className={buttonClass} onClick={onClick} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={buttonClass} onClick={onClick} {...props}>
      {content}
    </button>
  );
}

export default Button;
