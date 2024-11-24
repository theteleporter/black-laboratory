import Link from 'next/link'

const projects = [
  { name: "MINIMALIST DESIGN", url: "/minimalist-design" },
  { name: "TYPOGRAPHY EXPLORATION", url: "/typography-exploration" },
  { name: "MONOCHROME STUDIES", url: "/monochrome-studies" },
  { name: "GRID SYSTEMS", url: "/grid-systems" },
  { name: "NEGATIVE SPACE", url: "/negative-space" },
  { name: "FUNCTIONAL AESTHETICS", url: "/functional-aesthetics" },
  { name: "GEOMETRIC PATTERNS", url: "/geometric-patterns" },
  { name: "CLEAN INTERFACES", url: "/clean-interfaces" },
  { name: "VISUAL HIERARCHY", url: "/visual-hierarchy" },
  { name: "SIMPLICITY IN FORM", url: "/simplicity-in-form" }
]

export default function ProjectList() {
  return (
    <ul className="space-y-2">
      {projects.map((project, index) => (
        <li key={index} className="text-sm">
          <Link href={project.url} className="hover:underline">
            {project.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}

