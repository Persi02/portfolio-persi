const indent2 = "  ";

export function HeroVisual() {
  return (
    <div className="relative" aria-hidden="true">
      <div className="absolute -inset-10 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative overflow-hidden rounded-lg border border-border bg-card shadow-card">
        <div className="flex items-center gap-1.5 border-b border-border/60 bg-muted/50 px-3 py-2.5">
          <span className="size-2 rounded-full bg-muted-foreground/25" />
          <span className="size-2 rounded-full bg-muted-foreground/25" />
          <span className="size-2 rounded-full bg-muted-foreground/25" />
          <span className="ml-2 font-mono text-xs text-muted-foreground">
            herinjaka.ts
          </span>
        </div>
        <pre className="whitespace-pre p-4 font-mono text-[13px] leading-6">
          <span className="text-muted-foreground/60">{"// herinjaka.ts"}</span>
          <br />
          <br />
          <span className="text-code-keyword">const</span>{" "}
          <span className="text-code-variable">developer</span>{" "}
          <span className="text-muted-foreground">= {"{"}</span>
          <br />
          {indent2}
          <span className="text-code-function">role</span>
          <span className="text-muted-foreground">: </span>
          <span className="text-code-string">{'"Web Developer"'}</span>
          <span className="text-muted-foreground">,</span>
          <br />
          {indent2}
          <span className="text-code-function">stack</span>
          <span className="text-muted-foreground">: [</span>
          <span className="text-code-string">{'"React"'}</span>
          <span className="text-muted-foreground">, </span>
          <span className="text-code-string">{'"Next.js"'}</span>
          <span className="text-muted-foreground">, </span>
          <span className="text-code-string">{'"Node.js"'}</span>
          <span className="text-muted-foreground">],</span>
          <br />
          {indent2}
          <span className="text-code-function">focus</span>
          <span className="text-muted-foreground">: </span>
          <span className="text-code-string">{'"applications web modernes"'}</span>
          <span className="text-muted-foreground">,</span>
          <br />
          <span className="text-muted-foreground">{"};"}</span>
          <br />
          <br />
          <span className="text-code-keyword">export</span>{" "}
          <span className="text-code-keyword">default</span>{" "}
          <span className="text-code-variable">developer</span>
          <span className="text-muted-foreground">;</span>
        </pre>
      </div>
    </div>
  );
}
