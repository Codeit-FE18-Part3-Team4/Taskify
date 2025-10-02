import Button, { ButtonSize, ButtonVariant } from "@/components/button/button";
import Dialog from "@/components/dialog/dialog";
import Modal from "@/components/modal/modal";
import Typography from "@/components/typography/typography";
import { useDialog } from "@/hooks/use-dialog";
import { useModal } from "@/hooks/use-modal";
import { ReactNode } from "react";
import { ProfileColor } from "@/constants/chips/profile-colors.enum";
import BadgeChip from "@/components/chips/badge";
import BoardColorChip from "@/components/chips/chips-color";
import { CHIP_COLORS } from "@/constants/chips/chip-colors";
import { CommonSize } from "@/constants/common/common-size.enum";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={{ margin: "24px 0" }}>
      <h2
        className={Typography.xl2Bold}
        style={{
          marginBottom: "12px",
          paddingBottom: "8px",
          borderBottom: "1px solid black",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

function TypographySample() {
  const sizes = [
    [
      [Typography.xl3Bold, "3xl Bold"],
      [Typography.xl3SemiBold, "3xl Semibold"],
    ],
    [
      [Typography.xl2Bold, "2xl Bold"],
      [Typography.xl2SemiBold, "2xl Semibold"],
      [Typography.xl2Medium, "2xl Medium"],
    ],
    [
      [Typography.xlBold, "xl Bold"],
      [Typography.xlSemiBold, "xl Semibold"],
      [Typography.xlMedium, "xl Medium"],
    ],
    [
      [Typography.lg2Bold, "2lg Bold"],
      [Typography.lg2SemiBold, "2lg Semibold"],
      [Typography.lg2Medium, "2lg Medium"],
    ],
    [
      [Typography.lgBold, "lg Bold"],
      [Typography.lgSemiBold, "lg Semibold"],
      [Typography.lgMedium, "lg Medium"],
      [Typography.lgMedium160, "lg Medium 160"],
    ],
    [
      [Typography.mdBold, "md Bold"],
      [Typography.mdSemiBold, "md Semibold"],
      [Typography.mdMedium, "md Medium"],
      [Typography.mdMedium150, "md Medium 150"],
    ],
    [
      [Typography.smSemiBold, "sm Semibold"],
      [Typography.smMedium, "sm Medium"],
    ],
    [
      [Typography.xsSemiBold, "xs Semibold"],
      [Typography.xsMedium, "xs Medium"],
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

function ColorSample() {
  function ColorBox({ token }: { token: string }) {
    return (
      <div
        style={{
          minWidth: "80px",
          height: "50px",
          padding: "0 10px",
          backgroundColor: `var(--color-${token})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontWeight: "medium",
        }}
      >
        {token}
      </div>
    );
  }

  function PaletteBox({ children }: { children: ReactNode }) {
    return <div style={{ display: "flex" }}>{children}</div>;
  }

  return (
    <div>
      <PaletteBox>
        <ColorBox token="black900" />
        <ColorBox token="black800" />
        <ColorBox token="black700" />
        <ColorBox token="black600" />
        <ColorBox token="black500" />
      </PaletteBox>
      <PaletteBox>
        <ColorBox token="gray900" />
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
        <ColorBox token="brand950" />
        <ColorBox token="brand900" />
        <ColorBox token="brand800" />
        <ColorBox token="brand700" />
        <ColorBox token="brand600" />
        <ColorBox token="brand500" />
        <ColorBox token="brand400" />
        <ColorBox token="brand300" />
        <ColorBox token="brand200" />
        <ColorBox token="brand100" />
      </PaletteBox>
      <PaletteBox>
        <ColorBox token="red900" />
        <ColorBox token="red800" />
        <ColorBox token="red700" />
        <ColorBox token="red600" />
        <ColorBox token="red500" />
        <ColorBox token="red400" />
        <ColorBox token="red300" />
        <ColorBox token="red200" />
        <ColorBox token="red100" />
      </PaletteBox>
      <PaletteBox>
        <ColorBox token="background" />
        <ColorBox token="modalBackground" />
        <ColorBox token="stroke" />
      </PaletteBox>
      <PaletteBox>
        <ColorBox token="red" />
        <ColorBox token="blue" />
        <ColorBox token="blue300" />
        <ColorBox token="green" />
        <ColorBox token="violet" />
        <ColorBox token="cyan" />
        <ColorBox token="rose" />
        <ColorBox token="cobaltBlue" />
        <ColorBox token="yellow" />
        <ColorBox token="orange" />
      </PaletteBox>
    </div>
  );
}

function ButtonBox() {
  const sizes = [
    ButtonSize.Large,
    ButtonSize.Medium,
    ButtonSize.Small,
    ButtonSize.XSmall,
  ];
  return (
    <div>
      <div>
        {sizes.map((size) => (
          <div
            key={`primary-${size}`}
            style={{ display: "inline-block", margin: "4px" }}
          >
            <Button size={size}>Label</Button>
            <Button size={size} disabled>
              Label
            </Button>
          </div>
        ))}
      </div>
      <div>
        {sizes.map((size) => (
          <div
            key={`secondary-${size}`}
            style={{ display: "inline-block", margin: "4px" }}
          >
            <Button size={size} variant={ButtonVariant.Secondary}>
              Label
            </Button>
            <Button size={size} variant={ButtonVariant.Secondary} disabled>
              Label
            </Button>
          </div>
        ))}
      </div>
      <div>
        {sizes.map((size) => (
          <div
            key={`delete-${size}`}
            style={{ display: "inline-block", margin: "4px" }}
          >
            <Button size={size} variant={ButtonVariant.Delete}>
              삭제
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ModalSample() {
  const MODAL_KEY_1 = "MODAL_SAMPLE_1";
  const MODAL_KEY_2 = "MODAL_SAMPLE_2";
  const { isShowModal: isShowModal1, openModal: openModal1 } = useModal({
    key: MODAL_KEY_1,
  });
  const { isShowModal: isShowModal2, openModal: openModal2 } = useModal({
    key: MODAL_KEY_2,
  });

  return (
    <>
      <div>
        <button onClick={() => openModal1(true)}>Open Modal 1</button>
        {isShowModal1 && (
          <Modal modalKey={MODAL_KEY_1}>
            <div
              style={{
                width: "600px",
                height: "600px",
                backgroundColor: "#242429",
                borderRadius: "24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h2 style={{ color: "white" }}>Modal 1 Title</h2>
              <button onClick={() => openModal1(false)}>Close Modal 1</button>
            </div>
          </Modal>
        )}
      </div>
      <div>
        <button onClick={() => openModal2(true)}>Open Modal 2</button>
        {isShowModal2 && (
          <Modal modalKey={MODAL_KEY_2}>
            <div
              style={{
                width: "600px",
                height: "600px",
                backgroundColor: "#242429",
                borderRadius: "24px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h2 style={{ color: "white" }}>Modal 2 Title</h2>
              <button onClick={() => openModal2(false)}>Close Modal 2</button>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
}

function DialogSample() {
  const DIALOG_KEY = "DIALOG_SAMPLE";
  const { isShowDialog, openDialog } = useDialog({
    key: DIALOG_KEY,
  });

  return (
    <>
      <div>
        <button onClick={() => openDialog(true)}>Open Dialog</button>
        {isShowDialog && (
          <Dialog
            dialogKey={DIALOG_KEY}
            message="Hello, this is a dialog!"
            onConfirm={() => console.log("Dialog confirmed")}
          />
        )}
      </div>
    </>
  );
}

export default function Page() {
  return (
    <main style={{ padding: "24px" }}>
      <header>
        <h1 className={Typography.xl3Bold}>공통 컴포넌트 테스트 페이지</h1>
        <ul className={Typography.lg2Medium} style={{ marginTop: "16px" }}>
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
      <hr style={{ margin: "24px 0" }} />
      <Section title="Typography">
        <TypographySample />
      </Section>
      <Section title="Color">
        <ColorSample />
      </Section>
      <Section title="Button">
        <ButtonBox />
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
        <ModalSample />
      </Section>
      <Section title="Dialog">
        <DialogSample />
      </Section>
    </main>
  );
}
