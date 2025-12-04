export const handler = async () => {
  // Mock data served by Netlify Functions (no backend required)
  const projects = [
    {
      id: '1',
      title: 'Projet Résidentiel',
      category: 'Résidentiel',
      location: 'Québec',
      imageUrl: '/assets/logo.png',
      description: 'Rénovation complète d’une maison unifamiliale.',
      images: ['/assets/logo.png']
    },
    {
      id: '2',
      title: 'Projet Commercial',
      category: 'Commercial',
      location: 'Montréal',
      imageUrl: '/assets/logo.png',
      description: 'Aménagement d’un espace commercial moderne.',
      images: ['/assets/logo.png']
    }
  ];

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(projects)
  };
};
