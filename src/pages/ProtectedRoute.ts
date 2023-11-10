interface ProtectedRouteProps {
  children: JSX.Element;
  requireAdmin: boolean;
}

export default function ProtectedRoute({
  children,
  requireAdmin,
}: ProtectedRouteProps) {
  //로그인한 사용자가 있는지 확인
  // 그 사용자가 어드민 권한이 있는지 확인
  // requireAdmin이 트루인 경우 로그인도 되어있어 하고, 어드민 권한도 가지고 있어야 함
  // 조건에 맞지 않으면 상위경로로 이동
  // 조건에 맞는 경우에만 전달된 children으로 이동
  return children;
}
