// Chapter-wise JEE syllabus checklist (Class 11 + Class 12).
// Static reference data — only per-chapter progress lives in the database.

export type ClassLevel = "Class 11" | "Class 12";

export type Chapter = {
  key: string;
  name: string;
  subject: string;
  classLevel: ClassLevel;
};

export const SYLLABUS_VERSION = "JEE Main + Advanced chapter checklist";

export const CHECK_FIELDS = [
  { key: "notes_done", label: "Notes" },
  { key: "lectures_done", label: "Lectures" },
  { key: "dpp_done", label: "DPP" },
  { key: "module_done", label: "Module" },
  { key: "revision_done", label: "Revision" },
] as const;

export type CheckField = (typeof CHECK_FIELDS)[number]["key"];

export const SUBJECTS = ["Physics", "Chemistry", "Mathematics"] as const;
export const CLASS_LEVELS: ClassLevel[] = ["Class 11", "Class 12"];

const RAW: Record<string, Record<ClassLevel, string[]>> = {
  Physics: {
    "Class 11": [
      "Units, Dimensions & Experimental Physics",
      "Vectors",
      "Kinematics",
      "Laws of Motion",
      "Friction",
      "Work, Energy & Power",
      "Centre of Mass & System of Particles",
      "Collisions",
      "Circular Motion",
      "Rotational Motion",
      "Gravitation",
      "Mechanical Properties of Solids",
      "Mechanical Properties of Fluids",
      "Simple Harmonic Motion",
      "Waves",
      "Thermal Properties of Matter",
      "Kinetic Theory of Gases",
      "Thermodynamics",
    ],
    "Class 12": [
      "Electric Charges & Fields",
      "Electrostatic Potential & Capacitance",
      "Current Electricity",
      "Moving Charges & Magnetism",
      "Magnetism & Matter",
      "Electromagnetic Induction",
      "Alternating Current",
      "Electromagnetic Waves",
      "Ray Optics",
      "Wave Optics",
      "Dual Nature of Matter & Radiation",
      "Atoms",
      "Nuclei",
    ],
  },
  Chemistry: {
    "Class 11": [
      "Some Basic Concepts of Chemistry / Mole Concept",
      "Atomic Structure",
      "States of Matter",
      "Thermodynamics",
      "Chemical Equilibrium",
      "Ionic Equilibrium",
      "Classification of Elements & Periodicity",
      "Chemical Bonding & Molecular Structure",
      "Hydrogen",
      "s-Block Elements",
      "p-Block Elements — Groups 13 & 14",
      "Basic Principles of Organic Chemistry",
      "Alkanes",
      "Alkenes & Alkynes",
    ],
    "Class 12": [
      "Solid State",
      "Solutions",
      "Electrochemistry",
      "Chemical Kinetics",
      "Surface Chemistry",
      "p-Block Elements — Groups 15, 16, 17 & 18",
      "d-Block Elements",
      "f-Block Elements",
      "Coordination Compounds",
      "Isolation of Metals",
      "Qualitative Analysis",
      "Benzene",
      "Phenols",
      "Alkyl Halides",
      "Alcohols",
      "Ethers",
      "Aldehydes & Ketones",
      "Carboxylic Acids",
      "Amines",
      "Haloarenes",
      "Biomolecules",
      "Polymers",
      "Chemistry in Everyday Life",
      "Practical Organic Chemistry",
      "Environmental Chemistry",
    ],
  },
  Mathematics: {
    "Class 11": [
      "Sets",
      "Relations & Functions",
      "Trigonometric Functions",
      "Complex Numbers",
      "Quadratic Equations",
      "Sequences & Series",
      "Permutations & Combinations",
      "Binomial Theorem",
      "Probability",
      "Statistics",
      "Straight Lines",
      "Circles",
      "Parabola",
      "Ellipse",
      "Hyperbola",
      "Mathematical Reasoning / Basic Mathematical Concepts",
    ],
    "Class 12": [
      "Matrices",
      "Determinants",
      "Limits",
      "Continuity",
      "Differentiability",
      "Application of Derivatives",
      "Indefinite Integration",
      "Definite Integration",
      "Area Under Curves",
      "Differential Equations",
      "Vectors",
      "Three-Dimensional Geometry",
      "Probability",
    ],
  },
};

const PREFIX: Record<string, string> = {
  Physics: "phy",
  Chemistry: "chem",
  Mathematics: "math",
};

function slug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const CHAPTERS: Chapter[] = SUBJECTS.flatMap((subject) =>
  CLASS_LEVELS.flatMap((classLevel) =>
    (RAW[subject]?.[classLevel] ?? []).map((name) => ({
      key: `${PREFIX[subject]}-${classLevel === "Class 11" ? "11" : "12"}-${slug(name)}`,
      name,
      subject,
      classLevel,
    })),
  ),
);

export const CHAPTER_COUNT = CHAPTERS.length;
