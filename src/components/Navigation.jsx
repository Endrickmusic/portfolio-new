import { useNavigate } from "react-router-dom"

// Navigation component that can be used to navigate between pages
export function useNavigation() {
  const navigate = useNavigate()

  return {
    goToWork1: () => navigate("/work1"),
    goToWork2: () => navigate("/work2"),
    goToWork3: () => navigate("/work3"),
    goToAbout: () => navigate("/about"),
    goToPlayground: () => navigate("/playground"),
    goToExpertise: () => navigate("/expertise"),
    goToImprint: () => navigate("/imprint"),
    goHome: () => navigate("/"),
  }
}

// HOC to add navigation to 3D components
export function withNavigation(Component) {
  return function NavigationWrappedComponent(props) {
    const navigation = useNavigation()
    return <Component {...props} navigation={navigation} />
  }
}
