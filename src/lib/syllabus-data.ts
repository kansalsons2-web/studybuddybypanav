// Official JEE Advanced 2026 syllabus (identical to 2025), parsed from the
// official syllabus document. Static reference data — no database round-trip.

export type SyllabusTopic = { key: string; name: string };
export type SyllabusChapter = {
  key: string;
  name: string;
  branch: string | null;
  topics: SyllabusTopic[];
};
export type SyllabusSubject = { name: string; chapters: SyllabusChapter[] };

export const SYLLABUS_VERSION = "JEE Advanced 2026";

export const SYLLABUS: SyllabusSubject[] = [
  {
    "name": "Physics",
    "chapters": [
      {
        "key": "phys-general",
        "name": "General",
        "branch": null,
        "topics": [
          {
            "key": "phys-general-0",
            "name": "General Units and dimensions, dimensional analysis"
          },
          {
            "key": "phys-general-1",
            "name": "Least count, significant figures"
          },
          {
            "key": "phys-general-2",
            "name": "Methods of measurement and error analysis for physical quantities pertaining to the following experiments: ..."
          },
          {
            "key": "phys-general-3",
            "name": "Specific heat of a liquid using calorimeter, focal length of a concave mirror and a convex lens using u-v m..."
          }
        ]
      },
      {
        "key": "phys-mechanics",
        "name": "Mechanics",
        "branch": null,
        "topics": [
          {
            "key": "phys-mechanics-0",
            "name": "Kinematics in one and two dimensions (Cartesian coordinates only), projectiles"
          },
          {
            "key": "phys-mechanics-1",
            "name": "Uniform circular motion"
          },
          {
            "key": "phys-mechanics-2",
            "name": "Relative velocity"
          },
          {
            "key": "phys-mechanics-3",
            "name": "Newton’s laws of motion"
          },
          {
            "key": "phys-mechanics-4",
            "name": "Inertial and uniformly accelerated frames of reference"
          },
          {
            "key": "phys-mechanics-5",
            "name": "Static and dynamic friction"
          },
          {
            "key": "phys-mechanics-6",
            "name": "Kinetic and potential energy"
          },
          {
            "key": "phys-mechanics-7",
            "name": "Work and power"
          },
          {
            "key": "phys-mechanics-8",
            "name": "Conservation of linear momentum and mechanical energy"
          },
          {
            "key": "phys-mechanics-9",
            "name": "Systems of particles"
          },
          {
            "key": "phys-mechanics-10",
            "name": "Centre of mass and its motion"
          },
          {
            "key": "phys-mechanics-11",
            "name": "Impulse"
          },
          {
            "key": "phys-mechanics-12",
            "name": "Elastic and inelastic collisions"
          },
          {
            "key": "phys-mechanics-13",
            "name": "Rigid body, moment of inertia, parallel and perpendicular axes theorems, moment of inertia of uniform bodie..."
          }
        ]
      },
      {
        "key": "phys-thermal-physics",
        "name": "Thermal Physics",
        "branch": null,
        "topics": [
          {
            "key": "phys-thermal-physics-0",
            "name": "Thermal expansion of solids, liquids and gases"
          },
          {
            "key": "phys-thermal-physics-1",
            "name": "Calorimetry, latent heat"
          },
          {
            "key": "phys-thermal-physics-2",
            "name": "Heat conduction in one dimension"
          },
          {
            "key": "phys-thermal-physics-3",
            "name": "Elementary concepts of convection and radiation"
          },
          {
            "key": "phys-thermal-physics-4",
            "name": "Newton’s law of cooling"
          },
          {
            "key": "phys-thermal-physics-5",
            "name": "Ideal gas laws"
          },
          {
            "key": "phys-thermal-physics-6",
            "name": "Specific heats (Cv and Cp for monoatomic and diatomic gases)"
          },
          {
            "key": "phys-thermal-physics-7",
            "name": "Isothermal and adiabatic processes, bulk modulus of gases"
          },
          {
            "key": "phys-thermal-physics-8",
            "name": "Equivalence of heat and work"
          },
          {
            "key": "phys-thermal-physics-9",
            "name": "First law of thermodynamics and its applications (only for ideal gases)"
          },
          {
            "key": "phys-thermal-physics-10",
            "name": "Second law of thermodynamics, reversible and irreversible processes, Carnot engine and its efficiency"
          },
          {
            "key": "phys-thermal-physics-11",
            "name": "Blackbody radiation: absorptive and emissive powers"
          },
          {
            "key": "phys-thermal-physics-12",
            "name": "Kirchhoff’s law"
          },
          {
            "key": "phys-thermal-physics-13",
            "name": "Wien’s displacement law, Stefan’s law"
          }
        ]
      },
      {
        "key": "phys-electricity-and-magnetism",
        "name": "Electricity and Magnetism",
        "branch": null,
        "topics": [
          {
            "key": "phys-electricity-and-magnetism-0",
            "name": "Coulomb’s law"
          },
          {
            "key": "phys-electricity-and-magnetism-1",
            "name": "Electric field and potential"
          },
          {
            "key": "phys-electricity-and-magnetism-2",
            "name": "Electrical potential energy of a system of point charges and of electrical dipoles in a uniform electrostat..."
          },
          {
            "key": "phys-electricity-and-magnetism-3",
            "name": "Electric field lines"
          },
          {
            "key": "phys-electricity-and-magnetism-4",
            "name": "Flux of electric field"
          },
          {
            "key": "phys-electricity-and-magnetism-5",
            "name": "Gauss’s law and its application in simple cases, such as, to find field due to infinitely long straight wir..."
          },
          {
            "key": "phys-electricity-and-magnetism-6",
            "name": "Capacitance"
          },
          {
            "key": "phys-electricity-and-magnetism-7",
            "name": "Parallel plate capacitor with and without dielectrics"
          },
          {
            "key": "phys-electricity-and-magnetism-8",
            "name": "Capacitors in series and parallel"
          },
          {
            "key": "phys-electricity-and-magnetism-9",
            "name": "Energy stored in a capacitor"
          },
          {
            "key": "phys-electricity-and-magnetism-10",
            "name": "Electric current"
          },
          {
            "key": "phys-electricity-and-magnetism-11",
            "name": "Ohm’s law"
          },
          {
            "key": "phys-electricity-and-magnetism-12",
            "name": "Series and parallel arrangements of resistances and cells"
          },
          {
            "key": "phys-electricity-and-magnetism-13",
            "name": "Kirchhoff’s laws and simple applications"
          }
        ]
      },
      {
        "key": "phys-electromagnetic-waves",
        "name": "Electromagnetic Waves",
        "branch": null,
        "topics": [
          {
            "key": "phys-electromagnetic-waves-0",
            "name": "Electromagnetic waves and their characteristics"
          },
          {
            "key": "phys-electromagnetic-waves-1",
            "name": "Electromagnetic spectrum (radio waves, microwaves, infrared, visible, ultraviolet, x-rays, gamma rays) incl..."
          }
        ]
      },
      {
        "key": "phys-optics",
        "name": "Optics",
        "branch": null,
        "topics": [
          {
            "key": "phys-optics-0",
            "name": "Rectilinear propagation of light"
          },
          {
            "key": "phys-optics-1",
            "name": "Reflection and refraction at plane and spherical surfaces"
          },
          {
            "key": "phys-optics-2",
            "name": "Total internal reflection"
          },
          {
            "key": "phys-optics-3",
            "name": "Deviation and dispersion of light by a prism"
          },
          {
            "key": "phys-optics-4",
            "name": "Thin lenses"
          },
          {
            "key": "phys-optics-5",
            "name": "Combinations of mirrors and thin lenses"
          },
          {
            "key": "phys-optics-6",
            "name": "Magnification"
          },
          {
            "key": "phys-optics-7",
            "name": "Wave nature of light: Huygen’s principle, interference limited to Young’s double slit experiment"
          },
          {
            "key": "phys-optics-8",
            "name": "Diffraction due to a single slit"
          },
          {
            "key": "phys-optics-9",
            "name": "Polarization of light, plane polarized light"
          },
          {
            "key": "phys-optics-10",
            "name": "Brewster's law, Polaroids"
          }
        ]
      },
      {
        "key": "phys-modern-physics",
        "name": "Modern Physics",
        "branch": null,
        "topics": [
          {
            "key": "phys-modern-physics-0",
            "name": "Atomic nucleus"
          },
          {
            "key": "phys-modern-physics-1",
            "name": "Α, β and γ radiations"
          },
          {
            "key": "phys-modern-physics-2",
            "name": "Law of radioactive decay"
          },
          {
            "key": "phys-modern-physics-3",
            "name": "Decay constant"
          },
          {
            "key": "phys-modern-physics-4",
            "name": "Half-life and mean life"
          },
          {
            "key": "phys-modern-physics-5",
            "name": "Binding energy and its calculation"
          },
          {
            "key": "phys-modern-physics-6",
            "name": "Fission and fusion processes"
          },
          {
            "key": "phys-modern-physics-7",
            "name": "Energy calculation in these processes"
          },
          {
            "key": "phys-modern-physics-8",
            "name": "Photoelectric effect"
          },
          {
            "key": "phys-modern-physics-9",
            "name": "Bohr’s theory of hydrogen-like atoms"
          },
          {
            "key": "phys-modern-physics-10",
            "name": "Characteristic and continuous X-rays, Moseley’s law"
          },
          {
            "key": "phys-modern-physics-11",
            "name": "De Broglie wavelength of matter waves"
          }
        ]
      }
    ]
  },
  {
    "name": "Chemistry",
    "chapters": [
      {
        "key": "chem-general-topics",
        "name": "General topics",
        "branch": "Physical Chemistry",
        "topics": [
          {
            "key": "chem-general-topics-0",
            "name": "Concept of atoms and molecules"
          },
          {
            "key": "chem-general-topics-1",
            "name": "Dalton’s atomic theory"
          },
          {
            "key": "chem-general-topics-2",
            "name": "Mole concept"
          },
          {
            "key": "chem-general-topics-3",
            "name": "Chemical formulae"
          },
          {
            "key": "chem-general-topics-4",
            "name": "Balanced chemical equations"
          },
          {
            "key": "chem-general-topics-5",
            "name": "Calculations (based on mole concept and stoichiometry) involving common oxidation-reduction, neutralisation..."
          },
          {
            "key": "chem-general-topics-6",
            "name": "Concentration in terms of mole fraction, molarity, molality and normality"
          }
        ]
      },
      {
        "key": "chem-states-of-matter-gases-and-liquids",
        "name": "States of Matter: Gases and Liquids",
        "branch": "Physical Chemistry",
        "topics": [
          {
            "key": "chem-states-of-matter-gases-and-l-0",
            "name": "Gas laws and ideal gas equation, absolute scale of temperature"
          },
          {
            "key": "chem-states-of-matter-gases-and-l-1",
            "name": "Deviation from ideality, van der Waals equation"
          },
          {
            "key": "chem-states-of-matter-gases-and-l-2",
            "name": "Kinetic theory of gases, average, root mean square and most probable velocities and their relation with tem..."
          },
          {
            "key": "chem-states-of-matter-gases-and-l-3",
            "name": "Law of partial pressures"
          },
          {
            "key": "chem-states-of-matter-gases-and-l-4",
            "name": "Diffusion of gases"
          },
          {
            "key": "chem-states-of-matter-gases-and-l-5",
            "name": "Intermolecular interactions: types, distance dependence, and their effect on properties"
          },
          {
            "key": "chem-states-of-matter-gases-and-l-6",
            "name": "Liquids: vapour pressure, surface tension, viscosity"
          }
        ]
      },
      {
        "key": "chem-atomic-structure",
        "name": "Atomic Structure",
        "branch": "Physical Chemistry",
        "topics": [
          {
            "key": "chem-atomic-structure-0",
            "name": "Bohr model, spectrum of hydrogen atom"
          },
          {
            "key": "chem-atomic-structure-1",
            "name": "Wave-particle duality, de Broglie hypothesis"
          },
          {
            "key": "chem-atomic-structure-2",
            "name": "Uncertainty principle"
          },
          {
            "key": "chem-atomic-structure-3",
            "name": "Qualitative quantum mechanical picture of hydrogen atom: Energies, quantum numbers, wave function and proba..."
          },
          {
            "key": "chem-atomic-structure-4",
            "name": "Aufbau principle"
          },
          {
            "key": "chem-atomic-structure-5",
            "name": "Pauli’s exclusion principle and Hund’s rule"
          }
        ]
      },
      {
        "key": "chem-chemical-bonding-and-molecular-str",
        "name": "Chemical Bonding and Molecular Structure",
        "branch": "Physical Chemistry",
        "topics": [
          {
            "key": "chem-chemical-bonding-and-molecul-0",
            "name": "Orbital overlap and covalent bond"
          },
          {
            "key": "chem-chemical-bonding-and-molecul-1",
            "name": "Hybridisation involving s, p and d orbitals only"
          },
          {
            "key": "chem-chemical-bonding-and-molecul-2",
            "name": "Molecular orbital energy diagrams for homonuclear diatomic species (up to Ne2)"
          },
          {
            "key": "chem-chemical-bonding-and-molecul-3",
            "name": "Hydrogen bond"
          },
          {
            "key": "chem-chemical-bonding-and-molecul-4",
            "name": "Polarity in molecules, dipole moment"
          },
          {
            "key": "chem-chemical-bonding-and-molecul-5",
            "name": "VSEPR model and shapes of molecules (linear, angular, triangular, square planar, pyramidal, square pyramida..."
          }
        ]
      },
      {
        "key": "chem-chemical-thermodynamics",
        "name": "Chemical Thermodynamics",
        "branch": "Physical Chemistry",
        "topics": [
          {
            "key": "chem-chemical-thermodynamics-0",
            "name": "Intensive and extensive properties, state functions, First law of thermodynamics"
          },
          {
            "key": "chem-chemical-thermodynamics-1",
            "name": "Internal energy, work (pressure-volume only) and heat"
          },
          {
            "key": "chem-chemical-thermodynamics-2",
            "name": "Enthalpy, heat capacity, standard state, Hess’s law"
          },
          {
            "key": "chem-chemical-thermodynamics-3",
            "name": "Enthalpy of reaction, fusion and vaporization, and lattice enthalpy"
          },
          {
            "key": "chem-chemical-thermodynamics-4",
            "name": "Second law of thermodynamics"
          },
          {
            "key": "chem-chemical-thermodynamics-5",
            "name": "Entropy"
          },
          {
            "key": "chem-chemical-thermodynamics-6",
            "name": "Gibbs energy"
          },
          {
            "key": "chem-chemical-thermodynamics-7",
            "name": "Criteria of equilibrium and spontaneity"
          }
        ]
      },
      {
        "key": "chem-chemical-and-ionic-equilibrium",
        "name": "Chemical and Ionic Equilibrium",
        "branch": "Physical Chemistry",
        "topics": [
          {
            "key": "chem-chemical-and-ionic-equilibri-0",
            "name": "Law of mass action"
          },
          {
            "key": "chem-chemical-and-ionic-equilibri-1",
            "name": "Significance of ∆𝐺 and ∆𝐺 ⊖ in chemical equilibrium"
          },
          {
            "key": "chem-chemical-and-ionic-equilibri-2",
            "name": "Equilibrium constant (Kp and Kc) and reaction quotient, Le Chatelier’s principle (effect of concentration, ..."
          },
          {
            "key": "chem-chemical-and-ionic-equilibri-3",
            "name": "Solubility product and its applications, common ion effect, pH and buffer solutions"
          },
          {
            "key": "chem-chemical-and-ionic-equilibri-4",
            "name": "Acids and bases (Brønsted and Lewis concepts)"
          },
          {
            "key": "chem-chemical-and-ionic-equilibri-5",
            "name": "Hydrolysis of salts"
          }
        ]
      },
      {
        "key": "chem-electrochemistry",
        "name": "Electrochemistry",
        "branch": "Physical Chemistry",
        "topics": [
          {
            "key": "chem-electrochemistry-0",
            "name": "Electrochemical cells and cell reactions"
          },
          {
            "key": "chem-electrochemistry-1",
            "name": "Standard electrode potentials"
          },
          {
            "key": "chem-electrochemistry-2",
            "name": "Electrochemical work, Nernst equation"
          },
          {
            "key": "chem-electrochemistry-3",
            "name": "Electrochemical series, emf of galvanic cells"
          },
          {
            "key": "chem-electrochemistry-4",
            "name": "Faraday’s laws of electrolysis"
          },
          {
            "key": "chem-electrochemistry-5",
            "name": "Electrolytic conductance, specific, equivalent and molar conductivity, Kohlrausch’s law"
          },
          {
            "key": "chem-electrochemistry-6",
            "name": "Batteries: Primary and Secondary, fuel cells"
          },
          {
            "key": "chem-electrochemistry-7",
            "name": "Corrosion"
          }
        ]
      },
      {
        "key": "chem-chemical-kinetics",
        "name": "Chemical Kinetics",
        "branch": "Physical Chemistry",
        "topics": [
          {
            "key": "chem-chemical-kinetics-0",
            "name": "Rates of chemical reactions"
          },
          {
            "key": "chem-chemical-kinetics-1",
            "name": "Order and molecularity of reactions"
          },
          {
            "key": "chem-chemical-kinetics-2",
            "name": "Rate law, rate constant, half-life"
          },
          {
            "key": "chem-chemical-kinetics-3",
            "name": "Differential and integrated rate expressions for zero and first order reactions"
          },
          {
            "key": "chem-chemical-kinetics-4",
            "name": "Temperature dependence of rate constant (Arrhenius equation and activation energy)"
          },
          {
            "key": "chem-chemical-kinetics-5",
            "name": "Catalysis: Homogeneous and heterogeneous, activity and selectivity of solid catalysts, enzyme catalysis and..."
          }
        ]
      },
      {
        "key": "chem-solid-state",
        "name": "Solid State",
        "branch": "Physical Chemistry",
        "topics": [
          {
            "key": "chem-solid-state-0",
            "name": "Classification of solids, crystalline state, seven crystal systems (cell parameters a, b, c, α, β, γ), clos..."
          },
          {
            "key": "chem-solid-state-1",
            "name": "Nearest neighbours, ionic radii and radius ratio, point defects"
          }
        ]
      },
      {
        "key": "chem-solutions",
        "name": "Solutions",
        "branch": "Physical Chemistry",
        "topics": [
          {
            "key": "chem-solutions-0",
            "name": "Henry’s law"
          },
          {
            "key": "chem-solutions-1",
            "name": "Raoult’s law"
          },
          {
            "key": "chem-solutions-2",
            "name": "Ideal solutions"
          },
          {
            "key": "chem-solutions-3",
            "name": "Colligative properties: lowering of vapour pressure, elevation of boiling point, depression of freezing poi..."
          },
          {
            "key": "chem-solutions-4",
            "name": "Van’t Hoff factor"
          }
        ]
      },
      {
        "key": "chem-surface-chemistry",
        "name": "Surface Chemistry",
        "branch": "Physical Chemistry",
        "topics": [
          {
            "key": "chem-surface-chemistry-0",
            "name": "Elementary concepts of adsorption: Physisorption and Chemisorption, Freundlich adsorption isotherm"
          },
          {
            "key": "chem-surface-chemistry-1",
            "name": "Colloids: types, methods of preparation and general properties"
          },
          {
            "key": "chem-surface-chemistry-2",
            "name": "Elementary ideas of emulsions, surfactants and micelles (only definitions and examples)"
          }
        ]
      },
      {
        "key": "chem-classification-of-elements-and-per",
        "name": "Classification of Elements and Periodicity in Properties",
        "branch": "Inorganic Chemistry",
        "topics": [
          {
            "key": "chem-classification-of-elements-a-0",
            "name": "Modern periodic law and the present form of periodic table"
          },
          {
            "key": "chem-classification-of-elements-a-1",
            "name": "Electronic configuration of elements"
          },
          {
            "key": "chem-classification-of-elements-a-2",
            "name": "Periodic trends in atomic radius, ionic radius, ionization enthalpy, electron gain enthalpy, valence, oxida..."
          }
        ]
      },
      {
        "key": "chem-hydrogen",
        "name": "Hydrogen",
        "branch": "Inorganic Chemistry",
        "topics": [
          {
            "key": "chem-hydrogen-0",
            "name": "Position of hydrogen in periodic table, occurrence, isotopes, preparation, properties and uses of hydrogen"
          },
          {
            "key": "chem-hydrogen-1",
            "name": "Hydrides – ionic, covalent and interstitial"
          },
          {
            "key": "chem-hydrogen-2",
            "name": "Physical and chemical properties of water, heavy water"
          },
          {
            "key": "chem-hydrogen-3",
            "name": "Hydrogen peroxide-preparation, reactions, use and structure"
          },
          {
            "key": "chem-hydrogen-4",
            "name": "Hydrogen as a fuel"
          }
        ]
      },
      {
        "key": "chem-s-block-elements",
        "name": "s-Block Elements",
        "branch": "Inorganic Chemistry",
        "topics": [
          {
            "key": "chem-s-block-elements-0",
            "name": "Alkali and alkaline earth metals-reactivity towards air, water, dihydrogen, halogens, acids"
          },
          {
            "key": "chem-s-block-elements-1",
            "name": "Their reducing nature including solutions in liquid ammonia"
          },
          {
            "key": "chem-s-block-elements-2",
            "name": "Uses of these elements"
          },
          {
            "key": "chem-s-block-elements-3",
            "name": "General characteristics of their oxides, hydroxides, halides, salts of oxoacids"
          },
          {
            "key": "chem-s-block-elements-4",
            "name": "Anomalous behaviour of lithium and beryllium"
          },
          {
            "key": "chem-s-block-elements-5",
            "name": "Preparation, properties, and uses of compounds of sodium (sodium carbonate, sodium chloride, sodium hydroxi..."
          }
        ]
      },
      {
        "key": "chem-p-block-elements",
        "name": "p-Block Elements",
        "branch": "Inorganic Chemistry",
        "topics": [
          {
            "key": "chem-p-block-elements-0",
            "name": "Oxidation state and trends in chemical reactivity of elements of groups 13- 17"
          },
          {
            "key": "chem-p-block-elements-1",
            "name": "Anomalous properties of boron, carbon, nitrogen, oxygen, and fluorine with respect to other elements in the..."
          },
          {
            "key": "chem-p-block-elements-2",
            "name": "Group 13: Reactivity towards acids, alkalis, and halogens"
          },
          {
            "key": "chem-p-block-elements-3",
            "name": "Preparation, properties, and uses of borax, orthoboric acid, diborane, boron trifluoride, aluminium chlorid..."
          },
          {
            "key": "chem-p-block-elements-4",
            "name": "Uses of boron and aluminium"
          },
          {
            "key": "chem-p-block-elements-5",
            "name": "Group 14: Reactivity towards water and halogen"
          },
          {
            "key": "chem-p-block-elements-6",
            "name": "Allotropes of carbon and uses of carbon"
          },
          {
            "key": "chem-p-block-elements-7",
            "name": "Preparation, properties, and uses of carbon monoxide, carbon dioxide, silicon dioxide, silicones, silicates..."
          },
          {
            "key": "chem-p-block-elements-8",
            "name": "Group 15: Reactivity towards hydrogen, oxygen, and halogen"
          },
          {
            "key": "chem-p-block-elements-9",
            "name": "Allotropes of phosphorous"
          },
          {
            "key": "chem-p-block-elements-10",
            "name": "Preparation, properties, and uses of dinitrogen, ammonia, nitric acid, phosphine, phosphorus trichloride, p..."
          },
          {
            "key": "chem-p-block-elements-11",
            "name": "Oxides of nitrogen and oxoacids of phosphorus"
          },
          {
            "key": "chem-p-block-elements-12",
            "name": "Group 16: Reactivity towards hydrogen, oxygen, and halogen"
          },
          {
            "key": "chem-p-block-elements-13",
            "name": "Simple oxides"
          }
        ]
      },
      {
        "key": "chem-d-block-elements",
        "name": "d-Block Elements",
        "branch": "Inorganic Chemistry",
        "topics": [
          {
            "key": "chem-d-block-elements-0",
            "name": "Oxidation states and their stability"
          },
          {
            "key": "chem-d-block-elements-1",
            "name": "Standard electrode potentials"
          },
          {
            "key": "chem-d-block-elements-2",
            "name": "Interstitial compounds"
          },
          {
            "key": "chem-d-block-elements-3",
            "name": "Alloys"
          },
          {
            "key": "chem-d-block-elements-4",
            "name": "Catalytic properties"
          },
          {
            "key": "chem-d-block-elements-5",
            "name": "Applications"
          },
          {
            "key": "chem-d-block-elements-6",
            "name": "Preparation, structure, and reactions of oxoanions of chromium and manganese"
          }
        ]
      },
      {
        "key": "chem-f-block-elements",
        "name": "f-Block Elements",
        "branch": "Inorganic Chemistry",
        "topics": [
          {
            "key": "chem-f-block-elements-0",
            "name": "Lanthanoid and actinoid contractions"
          },
          {
            "key": "chem-f-block-elements-1",
            "name": "Oxidation states"
          },
          {
            "key": "chem-f-block-elements-2",
            "name": "General characteristics"
          }
        ]
      },
      {
        "key": "chem-coordination-compounds",
        "name": "Coordination Compounds",
        "branch": "Inorganic Chemistry",
        "topics": [
          {
            "key": "chem-coordination-compounds-0",
            "name": "Werner’s theory"
          },
          {
            "key": "chem-coordination-compounds-1",
            "name": "Nomenclature, cis-trans and ionization isomerism, hybridization and geometries (linear, tetrahedral, square..."
          },
          {
            "key": "chem-coordination-compounds-2",
            "name": "Bonding [VBT and CFT (octahedral and tetrahedral fields)]"
          },
          {
            "key": "chem-coordination-compounds-3",
            "name": "Magnetic properties (spin-only) and colour of 3d-series coordination compounds"
          },
          {
            "key": "chem-coordination-compounds-4",
            "name": "Ligands and spectrochemical series"
          },
          {
            "key": "chem-coordination-compounds-5",
            "name": "Stability"
          },
          {
            "key": "chem-coordination-compounds-6",
            "name": "Importance and applications"
          },
          {
            "key": "chem-coordination-compounds-7",
            "name": "Metal carbonyls"
          }
        ]
      },
      {
        "key": "chem-isolation-of-metals",
        "name": "Isolation of Metals",
        "branch": "Inorganic Chemistry",
        "topics": [
          {
            "key": "chem-isolation-of-metals-0",
            "name": "Metal ores and their concentration"
          },
          {
            "key": "chem-isolation-of-metals-1",
            "name": "Extraction of crude metal from concentrated ores: thermodynamic (iron, copper, zinc) and electrochemical (a..."
          },
          {
            "key": "chem-isolation-of-metals-2",
            "name": "Cyanide process (silver and gold)"
          },
          {
            "key": "chem-isolation-of-metals-3",
            "name": "Refining"
          }
        ]
      },
      {
        "key": "chem-principles-of-qualitative-analysis",
        "name": "Principles of Qualitative Analysis",
        "branch": "Inorganic Chemistry",
        "topics": [
          {
            "key": "chem-principles-of-qualitative-an-0",
            "name": "Groups I to V (only Ag+, Hg2+, Cu2+, Pb2+, Fe3+, Cr3+, Al3+, Ca2+, Ba2+, Zn2+, Mn2+ and Mg2+)"
          },
          {
            "key": "chem-principles-of-qualitative-an-1",
            "name": "Nitrate, halides (excluding fluoride), carbonate and bicarbonate, sulphate and sulphide"
          }
        ]
      },
      {
        "key": "chem-environmental-chemistry",
        "name": "Environmental Chemistry",
        "branch": "Inorganic Chemistry",
        "topics": [
          {
            "key": "chem-environmental-chemistry-0",
            "name": "Atmospheric pollution"
          },
          {
            "key": "chem-environmental-chemistry-1",
            "name": "Water pollution"
          },
          {
            "key": "chem-environmental-chemistry-2",
            "name": "Soil pollution"
          },
          {
            "key": "chem-environmental-chemistry-3",
            "name": "Industrial waste"
          },
          {
            "key": "chem-environmental-chemistry-4",
            "name": "Strategies to control environmental pollution"
          },
          {
            "key": "chem-environmental-chemistry-5",
            "name": "Green chemistry"
          }
        ]
      },
      {
        "key": "chem-basic-principles-of-organic-chemis",
        "name": "Basic Principles of Organic Chemistry",
        "branch": "Organic Chemistry",
        "topics": [
          {
            "key": "chem-basic-principles-of-organic--0",
            "name": "Hybridisation of carbon"
          },
          {
            "key": "chem-basic-principles-of-organic--1",
            "name": "Σ and π-bonds"
          },
          {
            "key": "chem-basic-principles-of-organic--2",
            "name": "Shapes of simple organic molecules"
          },
          {
            "key": "chem-basic-principles-of-organic--3",
            "name": "Aromaticity"
          },
          {
            "key": "chem-basic-principles-of-organic--4",
            "name": "Structural and geometrical isomerism"
          },
          {
            "key": "chem-basic-principles-of-organic--5",
            "name": "Stereoisomers and stereochemical relationship (enantiomers, diastereomers, meso) of compounds containing on..."
          },
          {
            "key": "chem-basic-principles-of-organic--6",
            "name": "Determination of empirical and molecular formulae of simple compounds by combustion method only"
          },
          {
            "key": "chem-basic-principles-of-organic--7",
            "name": "IUPAC nomenclature of organic molecules (hydrocarbons, including simple cyclic hydrocarbons and their mono-..."
          },
          {
            "key": "chem-basic-principles-of-organic--8",
            "name": "Hydrogen bonding effects"
          },
          {
            "key": "chem-basic-principles-of-organic--9",
            "name": "Inductive, Resonance and Hyperconjugative effects"
          },
          {
            "key": "chem-basic-principles-of-organic--10",
            "name": "Acidity and basicity of organic compounds"
          },
          {
            "key": "chem-basic-principles-of-organic--11",
            "name": "Reactive intermediates produced during homolytic and heterolytic bond cleavage"
          },
          {
            "key": "chem-basic-principles-of-organic--12",
            "name": "Formation, structure and stability of carbocations, carbanions and free radicals"
          }
        ]
      },
      {
        "key": "chem-alkanes",
        "name": "Alkanes",
        "branch": "Organic Chemistry",
        "topics": [
          {
            "key": "chem-alkanes-0",
            "name": "Homologous series"
          },
          {
            "key": "chem-alkanes-1",
            "name": "Physical properties (melting points, boiling points and density) and effect of branching on them"
          },
          {
            "key": "chem-alkanes-2",
            "name": "Conformations of ethane and butane (Newman projections only)"
          },
          {
            "key": "chem-alkanes-3",
            "name": "Preparation from alkyl halides and aliphatic carboxylic acids"
          },
          {
            "key": "chem-alkanes-4",
            "name": "Reactions: combustion, halogenation (including allylic and benzylic halogenation) and oxidation"
          }
        ]
      },
      {
        "key": "chem-alkenes-and-alkynes",
        "name": "Alkenes and Alkynes",
        "branch": "Organic Chemistry",
        "topics": [
          {
            "key": "chem-alkenes-and-alkynes-0",
            "name": "Physical properties (boiling points, density and dipole moments)"
          },
          {
            "key": "chem-alkenes-and-alkynes-1",
            "name": "Preparation by elimination reactions"
          },
          {
            "key": "chem-alkenes-and-alkynes-2",
            "name": "Acid catalysed hydration (excluding the stereochemistry of addition and elimination)"
          },
          {
            "key": "chem-alkenes-and-alkynes-3",
            "name": "Metal acetylides"
          },
          {
            "key": "chem-alkenes-and-alkynes-4",
            "name": "Reactions of alkenes with KMnO4 and ozone"
          },
          {
            "key": "chem-alkenes-and-alkynes-5",
            "name": "Reduction of alkenes and alkynes"
          },
          {
            "key": "chem-alkenes-and-alkynes-6",
            "name": "Electrophilic addition reactions of alkenes with X2, HX, HOX, (X=halogen)"
          },
          {
            "key": "chem-alkenes-and-alkynes-7",
            "name": "Effect of peroxide on addition reactions"
          },
          {
            "key": "chem-alkenes-and-alkynes-8",
            "name": "Cyclic polymerization reaction of alkynes"
          }
        ]
      },
      {
        "key": "chem-benzene",
        "name": "Benzene",
        "branch": "Organic Chemistry",
        "topics": [
          {
            "key": "chem-benzene-0",
            "name": "Structure"
          },
          {
            "key": "chem-benzene-1",
            "name": "Electrophilic substitution reactions: halogenation, nitration, sulphonation, Friedel-Crafts alkylation and ..."
          },
          {
            "key": "chem-benzene-2",
            "name": "Effect of directing groups (monosubstituted benzene) in these reactions"
          }
        ]
      },
      {
        "key": "chem-phenols",
        "name": "Phenols",
        "branch": "Organic Chemistry",
        "topics": [
          {
            "key": "chem-phenols-0",
            "name": "Physical properties"
          },
          {
            "key": "chem-phenols-1",
            "name": "Preparation, Electrophilic substitution reactions of phenol (halogenation, nitration, sulphonation)"
          },
          {
            "key": "chem-phenols-2",
            "name": "Reimer-Tiemann reaction, Kolbe reaction"
          },
          {
            "key": "chem-phenols-3",
            "name": "Esterification"
          },
          {
            "key": "chem-phenols-4",
            "name": "Etherification"
          },
          {
            "key": "chem-phenols-5",
            "name": "Aspirin synthesis"
          },
          {
            "key": "chem-phenols-6",
            "name": "Oxidation and reduction reactions of phenol"
          }
        ]
      },
      {
        "key": "chem-alkyl-halides",
        "name": "Alkyl Halides",
        "branch": "Organic Chemistry",
        "topics": [
          {
            "key": "chem-alkyl-halides-0",
            "name": "Rearrangement reactions of alkyl carbocation"
          },
          {
            "key": "chem-alkyl-halides-1",
            "name": "Grignard reactions"
          },
          {
            "key": "chem-alkyl-halides-2",
            "name": "Nucleophilic substitution reactions and their stereochemical aspects"
          }
        ]
      },
      {
        "key": "chem-alcohols",
        "name": "Alcohols",
        "branch": "Organic Chemistry",
        "topics": [
          {
            "key": "chem-alcohols-0",
            "name": "Physical properties"
          },
          {
            "key": "chem-alcohols-1",
            "name": "Reactions: esterification, dehydration (formation of alkenes and ethers)"
          },
          {
            "key": "chem-alcohols-2",
            "name": "Reactions with: sodium, phosphorus halides, ZnCl2/concentrated HCl, thionyl chloride"
          },
          {
            "key": "chem-alcohols-3",
            "name": "Conversion of alcohols into aldehydes, ketones and carboxylic acids"
          }
        ]
      },
      {
        "key": "chem-ethers",
        "name": "Ethers",
        "branch": "Organic Chemistry",
        "topics": [
          {
            "key": "chem-ethers-0",
            "name": "Preparation by Williamson’s synthesis"
          },
          {
            "key": "chem-ethers-1",
            "name": "C-O bond cleavage reactions"
          }
        ]
      },
      {
        "key": "chem-aldehydes-and-ketones",
        "name": "Aldehydes and Ketones",
        "branch": "Organic Chemistry",
        "topics": [
          {
            "key": "chem-aldehydes-and-ketones-0",
            "name": "Preparation of: aldehydes and ketones from acid chlorides and nitriles"
          },
          {
            "key": "chem-aldehydes-and-ketones-1",
            "name": "Aldehydes from esters"
          },
          {
            "key": "chem-aldehydes-and-ketones-2",
            "name": "Benzaldehyde from toluene and benzene"
          },
          {
            "key": "chem-aldehydes-and-ketones-3",
            "name": "Reactions: oxidation, reduction, oxime and hydrazone formation"
          },
          {
            "key": "chem-aldehydes-and-ketones-4",
            "name": "Aldol condensation, Cannizzaro reaction"
          },
          {
            "key": "chem-aldehydes-and-ketones-5",
            "name": "Haloform reaction"
          },
          {
            "key": "chem-aldehydes-and-ketones-6",
            "name": "Nucleophilic addition reaction with RMgX, NaHSO3, HCN, alcohol, amine"
          }
        ]
      },
      {
        "key": "chem-carboxylic-acids",
        "name": "Carboxylic Acids",
        "branch": "Organic Chemistry",
        "topics": [
          {
            "key": "chem-carboxylic-acids-0",
            "name": "Physical properties"
          },
          {
            "key": "chem-carboxylic-acids-1",
            "name": "Preparation: from nitriles, Grignard reagents, hydrolysis of esters and amides"
          },
          {
            "key": "chem-carboxylic-acids-2",
            "name": "Preparation of benzoic acid from alkylbenzenes"
          },
          {
            "key": "chem-carboxylic-acids-3",
            "name": "Reactions: reduction, halogenation, formation of esters, acid chlorides and amides"
          }
        ]
      },
      {
        "key": "chem-amines",
        "name": "Amines",
        "branch": "Organic Chemistry",
        "topics": [
          {
            "key": "chem-amines-0",
            "name": "Preparation from nitro compounds, nitriles and amides"
          },
          {
            "key": "chem-amines-1",
            "name": "Reactions: Hoffmann bromamide degradation, Gabriel phthalimide synthesis"
          },
          {
            "key": "chem-amines-2",
            "name": "Reaction with nitrous acid, Azo coupling reaction of diazonium salts of aromatic amines"
          },
          {
            "key": "chem-amines-3",
            "name": "Sandmeyer and related reactions of diazonium salts"
          },
          {
            "key": "chem-amines-4",
            "name": "Carbylamine reaction, Hinsberg test, Alkylation and acylation reactions"
          }
        ]
      },
      {
        "key": "chem-haloarenes",
        "name": "Haloarenes",
        "branch": "Organic Chemistry",
        "topics": [
          {
            "key": "chem-haloarenes-0",
            "name": "Reactions: Fittig, Wurtz-Fittig"
          },
          {
            "key": "chem-haloarenes-1",
            "name": "Nucleophilic aromatic substitution in haloarenes and substituted haloarenes (excluding benzyne mechanism an..."
          }
        ]
      },
      {
        "key": "chem-biomolecules",
        "name": "Biomolecules",
        "branch": "Organic Chemistry",
        "topics": [
          {
            "key": "chem-biomolecules-0",
            "name": "Carbohydrates: Classification"
          },
          {
            "key": "chem-biomolecules-1",
            "name": "Mono- and di-saccharides (glucose and sucrose)"
          },
          {
            "key": "chem-biomolecules-2",
            "name": "Oxidation"
          },
          {
            "key": "chem-biomolecules-3",
            "name": "Reduction"
          },
          {
            "key": "chem-biomolecules-4",
            "name": "Glycoside formation and hydrolysis of disaccharides (sucrose, maltose, lactose)"
          },
          {
            "key": "chem-biomolecules-5",
            "name": "Anomers"
          },
          {
            "key": "chem-biomolecules-6",
            "name": "Proteins: Amino acids"
          },
          {
            "key": "chem-biomolecules-7",
            "name": "Peptide linkage"
          },
          {
            "key": "chem-biomolecules-8",
            "name": "Structure of peptides (primary and secondary)"
          },
          {
            "key": "chem-biomolecules-9",
            "name": "Types of proteins (fibrous and globular)"
          },
          {
            "key": "chem-biomolecules-10",
            "name": "Nucleic acids: Chemical composition and structure of DNA and RNA"
          }
        ]
      },
      {
        "key": "chem-polymers",
        "name": "Polymers",
        "branch": "Organic Chemistry",
        "topics": [
          {
            "key": "chem-polymers-0",
            "name": "Types of polymerization (addition, condensation)"
          },
          {
            "key": "chem-polymers-1",
            "name": "Homo and copolymers"
          },
          {
            "key": "chem-polymers-2",
            "name": "Natural rubber"
          },
          {
            "key": "chem-polymers-3",
            "name": "Cellulose"
          },
          {
            "key": "chem-polymers-4",
            "name": "Nylon"
          },
          {
            "key": "chem-polymers-5",
            "name": "Teflon"
          },
          {
            "key": "chem-polymers-6",
            "name": "Bakelite"
          },
          {
            "key": "chem-polymers-7",
            "name": "Bio-degradable polymers"
          },
          {
            "key": "chem-polymers-8",
            "name": "Applications of polymers"
          }
        ]
      },
      {
        "key": "chem-chemistry-in-everyday-life",
        "name": "Chemistry in Everyday Life",
        "branch": "Organic Chemistry",
        "topics": [
          {
            "key": "chem-chemistry-in-everyday-life-0",
            "name": "Drug-target interaction"
          },
          {
            "key": "chem-chemistry-in-everyday-life-1",
            "name": "Therapeutic action, and examples (excluding structures), of antacids, antihistamines, tranquilizers, analge..."
          },
          {
            "key": "chem-chemistry-in-everyday-life-2",
            "name": "Artificial sweeteners (names only)"
          },
          {
            "key": "chem-chemistry-in-everyday-life-3",
            "name": "Soaps, detergents, and cleansing action"
          }
        ]
      },
      {
        "key": "chem-practical-organic-chemistry",
        "name": "Practical Organic Chemistry",
        "branch": "Organic Chemistry",
        "topics": [
          {
            "key": "chem-practical-organic-chemistry-0",
            "name": "Detection of elements (N, S, halogens)"
          },
          {
            "key": "chem-practical-organic-chemistry-1",
            "name": "Detection and identification of the following functional groups: hydroxyl (alcoholic and phenolic), carbony..."
          }
        ]
      }
    ]
  },
  {
    "name": "Mathematics",
    "chapters": [
      {
        "key": "math-sets-relations-and-functions",
        "name": "Sets, Relations and Functions",
        "branch": null,
        "topics": [
          {
            "key": "math-sets-relations-and-functions-0",
            "name": "Sets and their representations, different kinds of sets (empty, finite and infinite), algebra of sets, inte..."
          },
          {
            "key": "math-sets-relations-and-functions-1",
            "name": "Cartesian product of finite sets, ordered pair, relations, domain and codomain of relations, equivalence re..."
          },
          {
            "key": "math-sets-relations-and-functions-2",
            "name": "Function as a special case of relation, functions as mappings, domain, codomain, range of functions, invert..."
          }
        ]
      },
      {
        "key": "math-algebra",
        "name": "Algebra",
        "branch": null,
        "topics": [
          {
            "key": "math-algebra-0",
            "name": "Algebra of complex numbers, addition, multiplication, conjugation, polar representation, properties of modu..."
          },
          {
            "key": "math-algebra-1",
            "name": "Statement of fundamental theorem of algebra, Quadratic equations with real coefficients, relations between ..."
          },
          {
            "key": "math-algebra-2",
            "name": "Arithmetic and geometric progressions, arithmetic and geometric means, sums of finite arithmetic and geomet..."
          },
          {
            "key": "math-algebra-3",
            "name": "Logarithms and their properties, permutations and combinations, binomial theorem for a positive integral in..."
          }
        ]
      },
      {
        "key": "math-matrices",
        "name": "Matrices",
        "branch": null,
        "topics": [
          {
            "key": "math-matrices-0",
            "name": "Matrices as a rectangular array of real numbers, equality of matrices, addition, multiplication by a scalar..."
          }
        ]
      },
      {
        "key": "math-probability-and-statistics",
        "name": "Probability and Statistics",
        "branch": null,
        "topics": [
          {
            "key": "math-probability-and-statistics-0",
            "name": "Random experiment, sample space, different types of events (impossible, simple, compound), addition and mul..."
          },
          {
            "key": "math-probability-and-statistics-1",
            "name": "Measure of central tendency and dispersion, mean, median, mode, mean deviation, standard deviation and vari..."
          }
        ]
      },
      {
        "key": "math-trigonometry",
        "name": "Trigonometry",
        "branch": null,
        "topics": [
          {
            "key": "math-trigonometry-0",
            "name": "Trigonometric functions, their periodicity and graphs, addition and subtraction formulae, formulae involvin..."
          },
          {
            "key": "math-trigonometry-1",
            "name": "Inverse trigonometric functions (principal value only) and their elementary properties"
          }
        ]
      },
      {
        "key": "math-analytical-geometry",
        "name": "Analytical Geometry",
        "branch": null,
        "topics": [
          {
            "key": "math-analytical-geometry-0",
            "name": "Two dimensions: Cartesian coordinates, distance between two points, section formulae, shift of origin"
          },
          {
            "key": "math-analytical-geometry-1",
            "name": "Equation of a straight line in various forms, angle between two lines, distance of a point from a line"
          },
          {
            "key": "math-analytical-geometry-2",
            "name": "Lines through the point of intersection of two given lines, equation of the bisector of the angle between t..."
          },
          {
            "key": "math-analytical-geometry-3",
            "name": "Centroid, orthocentre, incentre and circumcentre of a triangle"
          },
          {
            "key": "math-analytical-geometry-4",
            "name": "Equation of a circle in various forms, equations of tangent, normal and chord"
          },
          {
            "key": "math-analytical-geometry-5",
            "name": "Parametric equations of a circle, intersection of a circle with a straight line or a circle, equation of a ..."
          },
          {
            "key": "math-analytical-geometry-6",
            "name": "Equations of a parabola, ellipse and hyperbola in standard form, their foci, directrices and eccentricity, ..."
          },
          {
            "key": "math-analytical-geometry-7",
            "name": "Locus problems"
          },
          {
            "key": "math-analytical-geometry-8",
            "name": "Three dimensions: Distance between two points, direction cosines and direction ratios, equation of a straig..."
          }
        ]
      },
      {
        "key": "math-differential-calculus",
        "name": "Differential Calculus",
        "branch": null,
        "topics": [
          {
            "key": "math-differential-calculus-0",
            "name": "Limit of a function at a real number, continuity of a function, limit and continuity of the sum, difference..."
          },
          {
            "key": "math-differential-calculus-1",
            "name": "Continuity of composite functions, intermediate value property of continuous functions"
          },
          {
            "key": "math-differential-calculus-2",
            "name": "Derivative of a function, derivative of the sum, difference, product and quotient of two functions, chain r..."
          },
          {
            "key": "math-differential-calculus-3",
            "name": "Tangents and normals, increasing and decreasing functions, derivatives of order two, maximum and minimum va..."
          }
        ]
      },
      {
        "key": "math-integral-calculus",
        "name": "Integral Calculus",
        "branch": null,
        "topics": [
          {
            "key": "math-integral-calculus-0",
            "name": "Integration as the inverse process of differentiation, indefinite integrals of standard functions, definite..."
          },
          {
            "key": "math-integral-calculus-1",
            "name": "Integration by parts, integration by the methods of substitution and partial fractions, application of defi..."
          },
          {
            "key": "math-integral-calculus-2",
            "name": "Formation of ordinary differential equations, solution of homogeneous differential equations of first order..."
          }
        ]
      },
      {
        "key": "math-vectors",
        "name": "Vectors",
        "branch": null,
        "topics": [
          {
            "key": "math-vectors-0",
            "name": "Addition of vectors, scalar multiplication, dot and cross products, scalar and vector triple products, and ..."
          }
        ]
      }
    ]
  }
];

export const ALL_TOPICS = SYLLABUS.flatMap((s) =>
  s.chapters.flatMap((c) =>
    c.topics.map((t) => ({ ...t, subject: s.name, chapter: c.name, chapterKey: c.key })),
  ),
);

export const TOPIC_COUNT = ALL_TOPICS.length;

export const TOPIC_STATUSES = [
  "Not Started",
  "Learning",
  "Practicing",
  "Needs Revision",
  "Strong",
  "Mastered",
] as const;
export type TopicStatus = (typeof TOPIC_STATUSES)[number];

/** 0-1 weight each status contributes to chapter/subject completion. */
export const STATUS_WEIGHT: Record<string, number> = {
  "Not Started": 0,
  Learning: 0.25,
  Practicing: 0.5,
  "Needs Revision": 0.4,
  Strong: 0.8,
  Mastered: 1,
};
