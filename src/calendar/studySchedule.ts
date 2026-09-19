// studySchedule.ts
// M-F weekly study themes + 8-week CKA Monday sub-topic rotation

export interface StudyTheme {
  dayOfWeek: number
  name: string
  shortName: string
  emoji: string
  color: string
  bgColor: string
  borderColor: string
  description: string
  resource: string
  resourceLabel: string
  isFlex?: boolean
}

export interface CKAWeekTopic {
  weekNum: number
  startDate: string
  endDate: string
  focus: string
  subTopics: string[]
}

export const CKA_WEEKLY_TOPICS: CKAWeekTopic[] = [
  { weekNum: 1, startDate: '2026-09-07', endDate: '2026-09-11', focus: 'Cluster Architecture pt 1', subTopics: ['kubeadm init', 'control plane components', 'API server, scheduler, controller-manager', 'etcd basics'] },
  { weekNum: 2, startDate: '2026-09-14', endDate: '2026-09-18', focus: 'Cluster Architecture pt 2', subTopics: ['cluster upgrades', 'HA setup', 'etcd backup & restore', 'kubeadm upgrade'] },
  { weekNum: 3, startDate: '2026-09-21', endDate: '2026-09-25', focus: 'Troubleshooting pt 1', subTopics: ['node NotReady diagnosis', 'CrashLoopBackOff', 'OOMKilled', 'kubectl logs & describe'] },
  { weekNum: 4, startDate: '2026-09-28', endDate: '2026-10-02', focus: 'Troubleshooting pt 2', subTopics: ['CoreDNS issues', 'service connectivity failures', 'resource quotas & limits', 'kubectl top'] },
  { weekNum: 5, startDate: '2026-10-05', endDate: '2026-10-09', focus: 'Services & Networking', subTopics: ['CNI plugins', 'ClusterIP / NodePort / LoadBalancer', 'Ingress controllers', 'NetworkPolicies'] },
  { weekNum: 6, startDate: '2026-10-12', endDate: '2026-10-16', focus: 'Workloads & Scheduling', subTopics: ['Deployments & StatefulSets', 'DaemonSets', 'Taints & Tolerations', 'Node Affinity & Resource Limits'] },
  { weekNum: 7, startDate: '2026-10-19', endDate: '2026-10-23', focus: 'Storage + Security', subTopics: ['PersistentVolumes & PVCs', 'StorageClasses', 'RBAC (Roles & ClusterRoles)', 'ServiceAccounts'] },
  { weekNum: 8, startDate: '2026-10-26', endDate: '2026-10-30', focus: '🔴 Mock Exam Mode', subTopics: ['killercoda full simulation', 'timed practice', 'review mistakes', 'command drills'] },
]

export function getCKAWeekTopic(dateStr: string): CKAWeekTopic | null {
  return CKA_WEEKLY_TOPICS.find((t) => dateStr >= t.startDate && dateStr <= t.endDate) ?? null
}

export const STUDY_THEMES: Record<number, StudyTheme> = {
  0: { dayOfWeek: 0, name: 'Flex Schedule', shortName: 'Flex', emoji: '🌀', color: '#a78bfa', bgColor: 'rgba(167,139,250,0.08)', borderColor: 'rgba(167,139,250,0.3)', description: 'Open study block — catch up, rest, or tackle any weak spot.', resource: '', resourceLabel: '', isFlex: true },
  1: { dayOfWeek: 1, name: 'CKA Deep Dive', shortName: 'CKA', emoji: '☸️', color: '#38bdf8', bgColor: 'rgba(56,189,248,0.08)', borderColor: 'rgba(56,189,248,0.3)', description: 'Kubernetes concepts + hands-on killercoda labs.', resource: 'https://killercoda.com/killer-shell-cka', resourceLabel: 'killercoda CKA' },
  2: { dayOfWeek: 2, name: 'System Design', shortName: 'Design', emoji: '🏗️', color: '#34d399', bgColor: 'rgba(52,211,153,0.08)', borderColor: 'rgba(52,211,153,0.3)', description: 'Design a system end-to-end, then write structured notes.', resource: 'https://bytebytego.com', resourceLabel: 'ByteByteGo' },
  3: { dayOfWeek: 3, name: 'LeetCode Focus', shortName: 'Leetcode', emoji: '🧩', color: '#fbbf24', bgColor: 'rgba(251,191,36,0.08)', borderColor: 'rgba(251,191,36,0.3)', description: 'Deep algorithm & data structure practice session.', resource: 'https://neetcode.io', resourceLabel: 'Neetcode.io' },
  4: { dayOfWeek: 4, name: 'Interview Prep', shortName: 'Interview', emoji: '🎤', color: '#fb923c', bgColor: 'rgba(251,146,60,0.08)', borderColor: 'rgba(251,146,60,0.3)', description: 'Behavioral STAR stories + technical communication practice.', resource: 'https://www.levels.fyi', resourceLabel: 'Levels.fyi' },
  5: { dayOfWeek: 5, name: 'Review & Reinforce', shortName: 'Review', emoji: '🔁', color: '#f472b6', bgColor: 'rgba(244,114,182,0.08)', borderColor: 'rgba(244,114,182,0.3)', description: 'Flashcards, weak spot review & mock interview simulation.', resource: 'https://www.pramp.com', resourceLabel: 'Pramp' },
  6: { dayOfWeek: 6, name: 'Flex Schedule', shortName: 'Flex', emoji: '🌀', color: '#a78bfa', bgColor: 'rgba(167,139,250,0.08)', borderColor: 'rgba(167,139,250,0.3)', description: 'Open study block — catch up, rest, or tackle any weak spot.', resource: '', resourceLabel: '', isFlex: true },
}

export function getStudyTheme(dateStr: string): StudyTheme {
  const date = new Date(dateStr + 'T12:00:00')
  const dow = date.getDay()
  return STUDY_THEMES[dow]
}
