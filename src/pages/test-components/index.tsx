import Alert, { AlertActionType } from "@/components/alert";
import Button, { ButtonSize, ButtonVariant } from "@/components/button/button";
import Checkbox from "@/components/checkbox/index";
import Badge from "@/components/chips/badge/badge";
import { CHIP_COLORS } from "@/components/chips/chip-color/chip-colors";
import ColorChip from "@/components/chips/chip-color/chips-color";
import { ColorFrameSize } from "@/components/chips/color-frame/color-frame-size";
import ColorPalette from "@/components/color-palette/color-palette";
import Dialog from "@/components/dialog";
import Input, { InputSize, InputVariant } from "@/components/input/input";
import Textarea from "@/components/input/textarea";
import Modal from "@/components/modal";
import Sheet, { SheetActionType } from "@/components/sheet";
import SheetSection from "@/components/sheet/sheet-section";
import Typography from "@/components/typography";
import { CommonSize } from "@/constants/common/common-size";
import { ProfileRandomColor } from "@/constants/profile-random-color";
import ImageInput from "@/features/edit-task/components/image-input";
import { useAlert } from "@/hooks/use-alert";
import { useDialog } from "@/hooks/use-dialog";
import { useModal } from "@/hooks/use-modal";
import { useSheet } from "@/hooks/use-sheet";
import { ReactNode, useState } from "react";

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

function InputBox() {
  const sizes = [InputSize.Large, InputSize.Medium];

  return (
    <div>
      {sizes.map((size) => (
        <div key={size} style={{ display: "inline-block", margin: "8px" }}>
          <div style={{ marginBottom: "8px" }}>
            <Input size={size} placeholder="placeholder" />
          </div>
          <div style={{ marginBottom: "8px" }}>
            <Input size={size} placeholder="Disabled" disabled />
          </div>
          <div style={{ marginBottom: "8px" }}>
            <div>
              <Input
                size={size}
                placeholder="Invalid Input"
                errorMessage="Error Message"
              />
            </div>
          </div>
          <div style={{ marginBottom: "8px" }}>
            <Input
              size={size}
              placeholder="Search Input"
              variant={InputVariant.Search}
            />
          </div>
          <div>
            <Input
              size={size}
              placeholder="Password Input"
              variant={InputVariant.Password}
            />
          </div>
        </div>
      ))}
    </div>
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

function AlertSample() {
  const ALERT_KEY = "ALERT_SAMPLE";
  const { isShowAlert, openAlert } = useAlert({
    key: ALERT_KEY,
  });

  return (
    <>
      <div>
        <button onClick={() => openAlert(true)}>Open Alert</button>
        {isShowAlert && (
          <Alert
            alertKey={ALERT_KEY}
            title="Alert Title"
            message="This is an alert message."
            actionType={AlertActionType.Delete}
            onCancel={() => console.log("Alert cancelled")}
            onAction={() => console.log("Alert confirmed")}
          />
        )}
      </div>
    </>
  );
}

function TextareaBox() {
  return (
    <div>
      <div style={{ marginBottom: "8px" }}>
        <Textarea placeholder="Text" />
      </div>
      <div style={{ marginBottom: "8px" }}>
        <Textarea placeholder="Disabled" disabled />
      </div>
    </div>
  );
}

function ColorChipSample() {
  return (
    <>
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
              <ColorChip key={index} color={item} size={size} />
            ))}
          </div>
        ))}
    </>
  );
}

function BadgeSample() {
  return (
    <>
      <div
        style={{
          display: `flex`,
          gap: `10px`,
        }}
      >
        {Object.values(ProfileRandomColor).map((profile, colorIndex) => (
          <Badge key={colorIndex} title={"태그내용"} colorIndex={colorIndex} />
        ))}
      </div>
    </>
  );
}

function ColorPaletteSample() {
  const sizes = Object.values(ColorFrameSize);
  const [selectedColors, setSelectedColors] = useState<string[]>(
    sizes.map(() => "")
  );

  const handleSelect = (index: number, color: string) => {
    setSelectedColors((prev) => {
      const newArr = [...prev];
      newArr[index] = color;
      return newArr;
    });
  };

  return (
    <>
      <div>
        {Object.values(ColorFrameSize).map((value, index) => (
          <div
            style={{
              margin: "10px 0",
              width:
                value === "xsmall"
                  ? "295px"
                  : value === "small"
                    ? "335px"
                    : value === "medium"
                      ? "446px"
                      : "740px",
            }}
          >
            <ColorPalette
              selectedColor={selectedColors[index]}
              onSelect={(color) => handleSelect(index, color)}
              size={value}
            />
          </div>
        ))}
      </div>
      <p>💣선택된 색: {selectedColors}</p>
    </>
  );
}

function SheetSample() {
  const SHEET_KEY = "SHEET_SAMPLE";
  const { isShowSheet, openSheet } = useSheet({
    key: SHEET_KEY,
  });
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (file: File) => {
    setImage(file);
  };

  return (
    <>
      <div>
        <button onClick={() => openSheet(true)}>Open Sheet</button>
        {isShowSheet && (
          <Sheet
            sheetKey={SHEET_KEY}
            title="Sheet Title"
            actionType={SheetActionType.Create}
            onCancel={() => console.log("Sheet cancelled")}
            onAction={() => console.log("Sheet confirmed")}
          >
            <SheetSection title="제목" required>
              <input />
            </SheetSection>
            <SheetSection title="설명" required>
              <input />
            </SheetSection>
            <SheetSection title="이미지">
              <ImageInput onChange={handleImageChange} />
            </SheetSection>
          </Sheet>
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
        <InputBox />
        <TextareaBox />
      </Section>
      <Section title="Checkbox">
        <Checkbox />
      </Section>
      <Section title="Chip">
        <ColorChipSample />
        <BadgeSample />
        <ColorPaletteSample />
      </Section>
      <Section title="Modal">
        <ModalSample />
      </Section>
      <Section title="Dialog">
        <DialogSample />
      </Section>
      <Section title="Alert">
        <AlertSample />
      </Section>
      <Section title="Sheet">
        <SheetSample />
      </Section>
    </main>
  );
}
