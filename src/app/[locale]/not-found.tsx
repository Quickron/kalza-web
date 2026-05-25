import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Section>
      <Container className="max-w-xl text-center">
        <p className="font-mono text-xs uppercase tracking-wider text-[var(--subtle)]">
          404
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          Página no encontrada
        </h1>
        <p className="mt-4 text-[var(--muted)]">
          La página que buscas no existe o fue movida.
        </p>
        <div className="mt-8">
          <LinkButton href="/" variant="primary">
            Volver al inicio
          </LinkButton>
        </div>
      </Container>
    </Section>
  );
}
