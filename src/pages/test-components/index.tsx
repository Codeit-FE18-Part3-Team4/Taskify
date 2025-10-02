import typographyStyles from "@/components/typography/typography.module.css";
import { ReactNode } from "react";
import { ProfileColor } from "@/constants/chips/profile-colors.enum";
import BadgeChip from "@/components/chips/badge";
import BoardColorChip from "@/components/chips/chips-color";
import { CHIP_COLORS } from "@/constants/chips/chip-colors";
import { CommonSize } from "@/constants/common/common-size.enum";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function Typography() {
  const sizes = [
    [
      [typographyStyles["xl3-bold"], "Text-3xl Bold"],
      [typographyStyles["xl3-semibold"], "Text-3xl Semibold"],
    ],
    [
      [typographyStyles["xl2-bold"], "Text-2xl Bold"],
      [typographyStyles["xl2-semibold"], "Text-2xl Semibold"],
      [typographyStyles["xl2-medium"], "Text-2xl Medium"],
      [typographyStyles["xl2-regular"], "Text-2xl Regular"],
    ],
    [
      [typographyStyles["xl-bold"], "Text-xl Bold"],
      [typographyStyles["xl-semibold"], "Text-xl Semibold"],
      [typographyStyles["xl-medium"], "Text-xl Medium"],
      [typographyStyles["xl-regular"], "Text-xl Regular"],
    ],
    [
      [typographyStyles["lg2-bold"], "Text-lg2 Bold"],
      [typographyStyles["lg2-semibold"], "Text-lg2 Semibold"],
      [typographyStyles["lg2-medium"], "Text-lg2 Medium"],
      [typographyStyles["lg2-regular"], "Text-lg2 Regular"],
    ],
    [
      [typographyStyles["lg-bold"], "Text-lg Bold"],
      [typographyStyles["lg-semibold"], "Text-lg Semibold"],
      [typographyStyles["lg-medium"], "Text-lg Medium"],
      [typographyStyles["lg-regular"], "Text-lg Regular"],
    ],
    [
      [typographyStyles["md-bold"], "Text-md Bold"],
      [typographyStyles["md-semibold"], "Text-md Semibold"],
      [typographyStyles["md-medium"], "Text-md Medium"],
      [typographyStyles["md-regular"], "Text-md Regular"],
    ],
    [
      [typographyStyles["sm-semibold"], "Text-sm Semibold"],
      [typographyStyles["sm-medium"], "Text-sm Medium"],
    ],
    [
      [typographyStyles["xs-semibold"], "Text-xs Semibold"],
      [typographyStyles["xs-medium"], "Text-xs Medium"],
      [typographyStyles["xs-regular"], "Text-xs Regular"],
    ],
  ];

  return (
    <div>
      {sizes.map((sizeGroup, index) => (
        <div key={index}>
          {sizeGroup.map((size) => (
            <div key={size[0]} className={size[0]}>
              {size[1]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function Color() {
  function ColorBox({ token }: { token: string }) {
    return (
      <div
        style={{
          width: "100px",
          height: "50px",
          backgroundColor: `var(--color-${token})`,
        }}
      ></div>
    );
  }
  function PaletteBox({ children }: { children: ReactNode }) {
    return <div style={{ display: "flex" }}>{children}</div>;
  }
  return (
    <div>
      <PaletteBox>
        <ColorBox token="gray800" />
        <ColorBox token="gray700" />
        <ColorBox token="gray600" />
        <ColorBox token="gray500" />
        <ColorBox token="gray400" />
        <ColorBox token="gray300" />
        <ColorBox token="gray200" />
        <ColorBox token="gray100" />
      </PaletteBox>
      <PaletteBox>
        <ColorBox token="violet" />
        <ColorBox token="violet80" />
        <ColorBox token="red" />
        <ColorBox token="green" />
        <ColorBox token="purple" />
        <ColorBox token="orange" />
        <ColorBox token="blue" />
        <ColorBox token="pink" />
      </PaletteBox>
    </div>
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
        <Typography />
      </Section>
      <Section title="Color">
        <Color />
      </Section>
      <Section title="Button">
        <p>This is a section about button.</p>
      </Section>
      <Section title="Input">
        <p>This is a section about input.</p>
      </Section>
      <Section title="Chip">
        <p>This is a section about chip.</p>
        {Object.values(CommonSize)
          .filter((value) => typeof value === "number")
          .map((size) => (
            <div
              key={size}
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              {CHIP_COLORS.map((item, index) => (
                <BoardColorChip key={index} color={item} size={size} />
              ))}
            </div>
          ))}

        <div
          style={{
            display: `flex`,
            gap: `10px`,
          }}
        >
          {Object.values(ProfileColor)
            .filter((value) => typeof value === "number")
            .map((colorIndex) => (
              <BadgeChip
                key={colorIndex}
                title={"태그내용"}
                colorIndex={colorIndex as ProfileColor}
              />
            ))}
        </div>
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
