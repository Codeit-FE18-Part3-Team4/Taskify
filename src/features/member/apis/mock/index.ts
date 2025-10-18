/** TODO
 * 1. Members mocking
 * 2. Columns와 members를 CardEditSheet에 props로 전달
 * 3. Dropdown에서 columns와 members 선택하는 기능 테스트
 * 4. Members는 profile과 name이 합쳐진 component를 options로 사용
 * 5. ...
 */

import { MemberInfo } from "@/types";
import membersMock from "./members.json";

export async function getMembers(): Promise<MemberInfo[]> {
  return membersMock.members;
}
