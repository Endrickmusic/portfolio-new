import { useNavigate } from "react-router-dom"
import { useTransitionContext } from "../contexts/TransitionContext"
import Scene from "./Scene"

export default function HomePageContent() {
  const navigate = useNavigate()
  const { navigateWithTransition } = useTransitionContext()

  // Create navigation handlers outside of Canvas context
  const navigation = {
    goToWork1: () => navigateWithTransition(navigate, "/work1"),
    goToWork2: () => navigateWithTransition(navigate, "/work2"),
    goToWork3: () => navigateWithTransition(navigate, "/work3"),
    goToAbout: () => navigateWithTransition(navigate, "/about"),
    goToPlayground: () => navigateWithTransition(navigate, "/playground"),
    goToExpertise: () => navigateWithTransition(navigate, "/expertise"),
    goToImprint: () => navigateWithTransition(navigate, "/imprint"),
    goHome: () => navigateWithTransition(navigate, "/"),
  }

  return <Scene navigation={navigation} />
}
