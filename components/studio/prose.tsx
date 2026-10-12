import Image from "next/image"
import Link from "next/link"
import { Children, isValidElement, type ComponentProps, type ReactNode } from "react"
import type { MDXComponents } from "mdx/types"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import { BrowserSandbox } from "../case-studies/browser-sandbox"

/** MDX often wraps JSX/images in <p>; promote to <div> when children include blocks. */
function hasBlockChild(children: ReactNode): boolean {
  return Children.toArray(children).some((child) => {
    if (!isValidElement(child)) return false
    if (typeof child.type === "string") {
      return ["div", "section", "table", "pre", "ul", "ol", "blockquote", "figure"].includes(child.type)
    }
    return true
  })
}

const components: MDXComponents = {
  p: ({ children }) => (hasBlockChild(children) ? <div>{children}</div> : <p>{children}</p>),
  a: ({ href = "", children }) =>
    href.startsWith("/") ? (
      <Link href={href}>{children}</Link>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  // A span, because MDX may still wrap markdown images in <p>.
  img: ({ src, alt }) => (
    <span className="prose-figure">
      <Image src={src || ""} alt={alt || ""} width={1640} height={1198} sizes="(max-width: 768px) 100vw, 760px" unoptimized />
    </span>
  ),
  table: ({ children, ...props }: ComponentProps<"table">) => (
    <div className="prose-table">
      <table {...props}>{children}</table>
    </div>
  ),
  BrowserSandbox: ({ src, alt, url }: { src?: string; alt?: string; url?: string }) => (
    <BrowserSandbox src={src || ""} alt={alt || ""} url={url} />
  ),
}

/** The page header already carries the title, so drop the article's own leading H1. */
function withoutLeadingTitle(source: string) {
  return source.replace(/^\s*#\s[^\n]*\n/, "")
}

export function Prose({ source, numbered = true }: { source: string; numbered?: boolean }) {
  return (
    <div className={numbered ? "prose-studio" : "prose-studio prose-plain"}>
      <MDXRemote
        source={withoutLeadingTitle(source)}
        components={components}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
    </div>
  )
}
