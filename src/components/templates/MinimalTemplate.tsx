import { ResumeData } from '@/types/resume';

interface MinimalTemplateProps {
  data: ResumeData;
}

export const MinimalTemplate = ({ data }: MinimalTemplateProps) => {
  const { personalInfo, experience, education, skills, projects } = data;

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-900 font-serif p-8">
      {/* Header */}
      <header className="text-center mb-8 border-b border-gray-300 pb-6">
        <h1 className="text-3xl font-bold mb-2 tracking-wide">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="flex justify-center space-x-6 text-sm text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
        {(personalInfo.linkedIn || personalInfo.portfolio) && (
          <div className="flex justify-center space-x-6 text-sm text-gray-600 mt-2">
            {personalInfo.linkedIn && <span>{personalInfo.linkedIn}</span>}
            {personalInfo.portfolio && <span>{personalInfo.portfolio}</span>}
          </div>
        )}
      </header>

      {/* Professional Summary */}
      {data.professionalSummary.content && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-3 uppercase tracking-wider border-b border-gray-200 pb-1">
            Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{data.professionalSummary.content}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-3 uppercase tracking-wider border-b border-gray-200 pb-1">
            Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <div>
                    <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                    <p className="text-gray-700">{exp.company}{exp.location && `, ${exp.location}`}</p>
                  </div>
                  <span className="text-gray-600 text-sm">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm ml-4">
                  {exp.description.map((desc, index) => (
                    <li key={index}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-3 uppercase tracking-wider border-b border-gray-200 pb-1">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {edu.degree} in {edu.field}
                  </h3>
                  <p className="text-gray-700">{edu.institution}</p>
                  {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
                  {edu.honors && edu.honors.length > 0 && (
                    <p className="text-gray-600 text-sm">Honors: {edu.honors.join(', ')}</p>
                  )}
                </div>
                <span className="text-gray-600 text-sm">
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {Object.keys(skillsByCategory).length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-3 uppercase tracking-wider border-b border-gray-200 pb-1">
            Skills
          </h2>
          <div className="space-y-2">
            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <div key={category}>
                <span className="font-semibold text-gray-700 capitalize">
                  {category.replace(/([A-Z])/g, ' $1').trim()}:
                </span>{' '}
                <span className="text-gray-600">
                  {categorySkills.map(skill => skill.name).join(', ')}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-3 uppercase tracking-wider border-b border-gray-200 pb-1">
            Projects
          </h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-semibold text-gray-900">{project.name}</h3>
                  <span className="text-gray-600 text-sm">
                    {project.startDate} - {project.endDate}
                  </span>
                </div>
                <p className="text-gray-700 text-sm mb-1">{project.description}</p>
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Technologies:</span> {project.technologies.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};