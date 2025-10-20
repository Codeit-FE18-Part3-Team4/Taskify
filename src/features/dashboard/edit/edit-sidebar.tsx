import Typography from "@/components/typography";
import styles from "./edit-sidebar.module.css";
import { classnames } from "@/utils/classnames";
import TrashIcon from "@/components/icon/trash-icon";

export enum TabType {
  Edit = "edit",
  ModifyMembers = "modifyMembers",
  Delete = "delete",
}

interface EditSidebarMenuProps {
  activeTab: TabType;
  onTabChange: (type: TabType) => void;
  createdByMe: boolean;
}

export default function EditSidebar({
  onTabChange,
  activeTab,
  createdByMe,
}: EditSidebarMenuProps) {
  return (
    <>
      <div className={styles.sidebar}>
        <div className={styles.sidebarMenu}>
          {createdByMe && (
            <>
              <button
                type="button"
                className={classnames(
                  Typography.lg2Medium,
                  activeTab === TabType.Edit ? styles.activeButton : "",
                )}
                onClick={() => onTabChange?.(TabType.Edit)}
              >
                대시보드 편집
              </button>
              <i className={styles.betweenLine} />
            </>
          )}
          <button
            type="button"
            className={classnames(
              Typography.lg2Medium,
              activeTab === TabType.ModifyMembers ? styles.activeButton : "",
            )}
            onClick={() => onTabChange?.(TabType.ModifyMembers)}
          >
            멤버 관리
          </button>
          {createdByMe && (
            <>
              <i className={styles.betweenLine} />
              <button
                type="button"
                className={classnames(
                  styles.trashButton,
                  Typography.lg2Medium,
                  activeTab === TabType.Delete ? styles.activeButton : "",
                )}
                onClick={() => onTabChange?.(TabType.Delete)}
              >
                <span>대시보드 삭제하기</span>
                <TrashIcon className={styles.icon} />
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
