import { Direction } from "@common/enums/direction";
import { Type_Footer } from "@common/types/Type_Footer";
import { BlockRenderer } from "@components/renderes/BlockRenderer";
import RichTextRenderer from "@components/rich-text/RichTextRenderer";
import { useRouter } from "next/router";

export default function PageFooter({ footer }: { footer: Type_Footer }) {
  const { footerColumns, footerContent, footerLinks } = footer.fields;
  const router = useRouter();
  const path = router.asPath;

  const Column = ({ column }: { column: unknown }) => {
    return <BlockRenderer section={column} />;
  };

  const FooterColumn = ({ column }: { column: any }) => {
    return (
      <div className="footer-column d-flex flex-column">
        {column?.fields?.title && (
          <p className="quick-link-header">{column?.fields?.title}</p>
        )}

        <div
          key={column.sys.id}
          className={`footer-column-item d-flex ${
            column.fields.direction == Direction.Horizontal
              ? "flex-row"
              : "flex-column"
          }`}
        >
          {
            //Render children
            column?.fields?.sections.map((section) => (
              <div key={section.sys.id}>
                {section.sys.contentType?.sys.id === "footerColumn" ? (
                  <FooterColumn column={section} />
                ) : (
                  <Column key={section.sys.id} column={section} />
                )}
              </div>
            ))
          }
        </div>
      </div>
    );
  };

  return (
    <div className="footer-container">
      <footer className="content-footer">
        <div className="content-footer-desktop">
          <div className="container wp-container d-flex flex-column">
            <div
              className={
                "quick-links d-flex flex-column flex-md-row " +
                (path.includes("quote-form") ? "form-footer" : "")
              }
            >
              {footerColumns?.map((column1, key) => {
                return <FooterColumn column={column1} key={`footerColumn${key}`} />;
              })}
            </div>

            {!path.includes("quote-form") &&
              footerColumns &&
              footerColumns.length !== 0 && (
                <div>
                  <hr />
                </div>
              )}

            <div className="license-name">
              {!path.includes("quote-form") && (
                <div className="legal_text">
                  {footerLinks?.map((link, linkKey) => (
                    <div key={`link${linkKey}`} className="d-inline">
                      <a href={link.fields.url}>{link.fields.title}</a>
                      {linkKey < footerLinks.length - 1 && " | "}
                    </div>
                  ))}
                </div>
              )}

              <RichTextRenderer text={footerContent} />
            </div>
          </div>
        </div>
        <div className="content-footer-mobile">
          <div className="container wp-container d-flex flex-column">
            <div
              className={
                "quick-links d-flex flex-column flex-md-row text-center" +
                (path.includes("quote-form") ? "form-footer" : "")
              }
            >
              {footerColumns?.map((column1, key) => {
                return <FooterColumn column={column1} key={`footerColumn${key}`} />;
              })}
            </div>

            {!path.includes("quote-form") &&
              footerColumns &&
              footerColumns.length !== 0 && (
                <div>
                  <hr />
                </div>
              )}

            <div className="license-name">
              {!path.includes("quote-form") && (
                <div className="legal_text">
                  {footerLinks?.map((link, linkKey) => (
                    <div key={`link${linkKey}`} className="d-inline">
                      <a href={link.fields.url}>{link.fields.title}</a>
                      {linkKey < footerLinks.length - 1 && " | "}
                    </div>
                  ))}
                </div>
              )}

              <RichTextRenderer text={footerContent} />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
