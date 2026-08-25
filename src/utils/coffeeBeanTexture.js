/**
 * Hand-drawn SVG tile (not a photo) — scattered coffee-bean silhouettes (an
 * ellipse + a curved center crease, the two features that actually read as
 * "coffee bean") repeated at different rotations, in the Caramel accent
 * (#c08552 — briefly Coffee-brown, then deep burgundy, across two
 * follow-ups; reverted back per "HARD RESTORE MODE — restore the original
 * orange accent." This is a hardcoded data-URI literal, can't read the
 * --color-accent CSS variable, so it needed its own direct edit each
 * time).
 * Self-contained data URI, no network request, no stock/AI imagery — the
 * project's asset rule ("no stock photos, no AI placeholder graphics, no
 * random URLs") rules out using an actual bean photo here.
 *
 * Shared by every "coffee black" surface (Navbar, Categories) so they all
 * render the identical texture rather than each carrying its own copy.
 * Consumers control visibility via their own `opacity-*` wrapper class —
 * this constant is just the pattern itself.
 */
export const COFFEE_BEAN_TEXTURE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cg fill='none' stroke='%23c08552' stroke-width='2.2' stroke-linecap='round' opacity='0.55'%3E%3Cg transform='translate(28,34) rotate(20)'%3E%3Cellipse cx='0' cy='0' rx='17' ry='10' fill='%23c08552' fill-opacity='0.16' stroke-opacity='0.6'/%3E%3Cpath d='M-10,0 Q0,-6 10,0'/%3E%3C/g%3E%3Cg transform='translate(118,20) rotate(-35)'%3E%3Cellipse cx='0' cy='0' rx='15' ry='9' fill='%23c08552' fill-opacity='0.16' stroke-opacity='0.6'/%3E%3Cpath d='M-9,0 Q0,-5 9,0'/%3E%3C/g%3E%3Cg transform='translate(70,90) rotate(60)'%3E%3Cellipse cx='0' cy='0' rx='18' ry='11' fill='%23c08552' fill-opacity='0.16' stroke-opacity='0.6'/%3E%3Cpath d='M-11,0 Q0,-6 11,0'/%3E%3C/g%3E%3Cg transform='translate(20,120) rotate(-15)'%3E%3Cellipse cx='0' cy='0' rx='14' ry='8' fill='%23c08552' fill-opacity='0.16' stroke-opacity='0.6'/%3E%3Cpath d='M-8,0 Q0,-4 8,0'/%3E%3C/g%3E%3Cg transform='translate(135,125) rotate(10)'%3E%3Cellipse cx='0' cy='0' rx='16' ry='9' fill='%23c08552' fill-opacity='0.16' stroke-opacity='0.6'/%3E%3Cpath d='M-9,0 Q0,-5 9,0'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
