import './SectionHeader.css';

/**
 * SectionHeader
 * Consistent modern editorial typography for all portfolio sections
 */
function SectionHeader({ eyebrow, title, description, align = 'left' }) {
  return (
    <div className={`section-header-block align-${align}`}>
      {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
      {title && <h2 className="section-title">{title}</h2>}
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}

export default SectionHeader;
