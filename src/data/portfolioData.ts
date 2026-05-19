import schoolImg1 from '../assets/projects/01_school/최은진_포트폴리오_4.jpg';
import schoolImg2 from '../assets/projects/01_school/최은진_포트폴리오_5.jpg';
import schoolImg3 from '../assets/projects/01_school/최은진_포트폴리오_6.jpg';

import kukboImg1 from '../assets/projects/02_kukbo/최은진_포트폴리오_13.jpg';
import kukboImg2 from '../assets/projects/02_kukbo/최은진_포트폴리오_14.jpg';
import kukboImg3 from '../assets/projects/02_kukbo/최은진_포트폴리오_15.jpg';
import kukboImg4 from '../assets/projects/02_kukbo/최은진_포트폴리오_16.jpg';
import kukboImg5 from '../assets/projects/02_kukbo/최은진_포트폴리오_17.jpg';

import cospecImg1 from '../assets/projects/03_cospec/최은진_포트폴리오_19.jpg';
import cospecImg2 from '../assets/projects/03_cospec/최은진_포트폴리오_20.jpg';
import cospecImg3 from '../assets/projects/03_cospec/최은진_포트폴리오_21.jpg';
import cospecImg4 from '../assets/projects/03_cospec/최은진_포트폴리오_22.jpg';
import cospecImg5 from '../assets/projects/03_cospec/최은진_포트폴리오_23.jpg';
import cospecImg6 from '../assets/projects/03_cospec/최은진_포트폴리오_24.jpg';

import hanmacImg1 from '../assets/projects/04_hanmac/260424_사운즈한남_(1)_LED전광판시안_1.jpg';
import hanmacImg2 from '../assets/projects/04_hanmac/260424_사운즈한남_(2)_LED전광판시안_1.jpg';
import hanmacImg3 from '../assets/projects/04_hanmac/260424_사운즈한남_(3)_LED전광판시안_1.jpg';
import hanmacImg4 from '../assets/projects/04_hanmac/(높이오타있음(2520))260424_사운즈한남_(4)_LED전광판시안_1.jpg';

export const portfolioData = {
  hero: {
    greeting: "안녕하세요!\n3D 디자이너 최은진입니다.",
    description: "실내건축디자인 전공을 기반으로 인테리어 설계, 건축 CG, \nLED 설계까지 공간을 시각화하고 구현하는 6년 차 디자이너입니다.",
    icons: {
    }
  },
  about: {
    location: "서울 성동구 성수동",
    contact: "jin0946@gmail.com | 010-8207-0946",
    mbti: "ENTJ",
    summary: [
      "실내건축디자인 전공 이후 인테리어 설계, 건축 CG, LED 설계 및 디자인 업무까지 약 5년 이상의 실무 경험을 쌓아왔습니다.",
      "AutoCAD, SketchUp, 3dsMax, Photoshop, V-Ray 등을 활용한 도면 작업 및 3D 시안 제작이 가능하며, 공간을 실제 구현 가능한 형태로 시각화하는 업무에 강점을 가지고 있습니다.",
      "다양한 프로젝트 협업 경험을 바탕으로 일정과 퀄리티를 책임감 있게 관리하며, 실무에 빠르게 적응하고 안정적으로 업무를 수행하는 디자이너입니다.",
      "작업의 완성도와 디테일을 중요하게 생각하며, 새로운 업무나 환경에도 빠르게 적응하여 안정적으로 프로젝트를 진행하는 강점을 가지고 있습니다."
    ],
  },
  techStack: {
    design: [
      { name: "3dsMax", icon: undefined },
      { name: "SketchUp", icon: undefined },
      { name: "AutoCAD", icon: undefined },
      { name: "V-Ray", icon: undefined }
    ],
    adobe: [
      { name: "Adobe Photoshop", icon: undefined },
      { name: "Adobe Illustrator", icon: undefined }
    ],
    office: [
      { name: "Excel", icon: undefined },
      { name: "PowerPoint", icon: undefined }
    ]
  },
  experiences: [
    {
      id: 1,
      company: "한맥아이티",
      logo: undefined,
      role: "설계(디자인)팀 · 대리",
      period: "2025.02 - 현재",
      description: "LED 전광판 설치를 위한 설계 도면 작업, 2D 및 3D 시안 제작, 공간 구조를 고려한 LED 배치 및 디자인 검토",
    },
    {
      id: 2,
      company: "코스펙에이비",
      logo: undefined,
      role: "CG팀 · 대리",
      period: "2021.01 - 2024.01",
      description: "건축 및 인테리어 프로젝트 CG 업무, 다양한 프로그램을 활용한 투시도 및 시각화 작업, 설계 도면 기반 3D 모델링",
    },
    {
      id: 3,
      company: "국보디자인",
      logo: undefined,
      role: "인테리어사업본부 · 사원",
      period: "2019.04 - 2020.03",
      description: "인테리어 설계 및 3D 샵드로잉, 제주 드림타워 복합리조트(1F 로비, 2F 카지노, 4층 마이스) 샵드로잉 및 3D 작업",
    }
  ],
  projects: [
    {
      id: 1,
      category: "01. 학교 프로젝트",
      name: "인덕대학교 실내건축디자인 졸업 작품",
      logo: undefined,
      period: "2015.03 - 2018.02",
      description: "실내건축디자인 전공 과정 중 진행한 주요 설계 및 3D 모델링 프로젝트",
      tech: ["AutoCAD", "SketchUp", "Photoshop"],
      detail: "인덕대학교 실내건축디자인과 재학 중 진행한 졸업 작품 및 주요 과제 프로젝트입니다. 공간의 기능과 미학을 고려한 설계를 바탕으로 3D 시각화 작업을 수행했습니다.",
      images: [schoolImg1, schoolImg2, schoolImg3]
    },
    {
      id: 2,
      category: "02. 국보디자인 프로젝트",
      name: "제주 드림타워 복합리조트 샵드로잉",
      logo: undefined,
      period: "2019.04 - 2020.03",
      description: "대규모 복합리조트 인테리어 샵드로잉 및 3D 모델링 프로젝트",
      tech: ["AutoCAD", "3dsMax", "Photoshop"],
      detail: "제주 드림타워 복합리조트 건설 프로젝트에 참여하여 인테리어 설계의 디테일을 완성하는 샵드로잉 업무를 수행했습니다.\n\n• 주요 공간: 1층 로비, 2층 카지노, 4층 마이스(MICE) 시설의 정밀 도면 작업\n• 3D 시각화: 설계 도면을 기반으로 한 3D 모델링 작업을 통해 실제 시공 전 공간감을 검증하고 조율하는 역할을 담당했습니다.\n• 협업: 시공 현장 및 설계팀과의 긴밀한 소통을 통해 설계 의도가 현장에 정확히 반영되도록 도면을 수정 및 보완했습니다.",
      images: [kukboImg1, kukboImg2, kukboImg3, kukboImg4, kukboImg5]
    },
    {
      id: 3,
      category: "03. 코스펙에이비 프로젝트",
      name: "건축 및 인테리어 투시도/시각화",
      logo: undefined,
      period: "2021.01 - 2024.01",
      description: "다양한 건축 및 인테리어 프로젝트의 고퀄리티 CG 작업",
      tech: ["3dsMax", "V-Ray", "Photoshop"],
      detail: "코스펙에이비 재직 중 수행한 주요 CG 및 시각화 프로젝트입니다. 설계 도면을 바탕으로 재질감과 조명을 정밀하게 구현하여 실감 나는 투시도를 제작했습니다.",
      images: [cospecImg1, cospecImg2, cospecImg3, cospecImg4, cospecImg5, cospecImg6]
    },
    {
      id: 4,
      category: "04. 한맥아이티 프로젝트",
      name: "LED 전광판 공간 디자인 및 시안 제작",
      logo: undefined,
      period: "2025.02 - 현재",
      description: "공간 환경에 최적화된 LED 전광판 배치 설계 및 시각화",
      tech: ["AutoCAD", "SketchUp", "V-Ray"],
      detail: "다양한 실내외 공간에 LED 전광판을 설치하기 위한 최적의 위치와 디자인을 제안하는 업무를 수행 중입니다.\n\n• 설계 도면: 설치 환경의 실측 데이터를 기반으로 정밀한 설치 도면을 작성합니다.\n• 3D 시뮬레이션: SketchUp과 V-Ray를 활용하여 설치 후의 모습을 현실감 있게 시뮬레이션하여 고객사의 의사결정을 지원합니다.\n• 구조 검토: 공간의 구조적 특성을 고려하여 안정적이고 미학적으로 조화로운 배치를 검토합니다.",
      images: [hanmacImg1, hanmacImg2, hanmacImg3, hanmacImg4]
    }
  ],
  education: [
    {
      id: 1,
      title: "인덕대학교 - 실내건축디자인과",
      period: "2015.03 - 2018.02 졸업"
    },
    {
      id: 2,
      title: "청원여자고등학교",
      period: "2011.03 - 2014.02 졸업"
    }
  ],
  certifications: [
    {
      id: 1,
      title: "전산응용건축제도기능사",
      date: "2015.04"
    },
    {
      id: 2,
      title: "GTQ포토샵1급",
      date: "2014.09"
    },
    {
      id: 3,
      title: "정보기술자격(ITQ) 인증시험",
      date: "2014.10"
    }
  ],
  training: [
    { id: 1, title: "전산응용건축제도기능사 취득 과정", provider: "한국산업인력공단", tech: "AutoCAD", image: null },
    { id: 2, title: "실내건축디자인 전공 과정", provider: "인덕대학교", tech: "Interior Design", image: null }
  ]
};
