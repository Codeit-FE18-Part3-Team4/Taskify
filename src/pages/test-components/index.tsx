import { ReactNode } from "react";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default function Page() {
  return (
    <main>
      <header>
        <h1>공통 컴포넌트 테스트 페이지</h1>
        <ul>
          <li>
            구현한 공통 컴포넌트의 동작을 테스트하고 사용 방법을 확인하는
            페이지입니다.
          </li>
          <li>
            담당한 컴포넌트를 구현할 때 해당하는 section에 use case를
            구현해주세요.
          </li>
          <li>
            컴포넌트 동작을 확인하고 코드 구현 예시를 확인할 수 있어야 합니다.
          </li>
        </ul>
      </header>
      <hr />
      <Section title="Typography">
        <p>This is a section about typography.</p>
      </Section>
      <Section title="Color">
        <p>This is a section about color.</p>
      </Section>
      <Section title="Button">
        <p>This is a section about button.</p>
      </Section>
      <Section title="Input">
        <p>This is a section about input.</p>
      </Section>
      <Section title="Chip">
        <p>This is a section about chip.</p>
      </Section>
      <Section title="Modal">
        <p>This is a section about modal.</p>
      </Section>
      <Section title="Dropdown">
        <p>This is a section about dropdown.</p>
      </Section>
    </main>
  );
}
