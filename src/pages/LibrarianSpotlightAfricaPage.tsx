import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Award, Users, Globe, BookOpen, CheckCircle, Heart, Star, Send, ArrowRight } from 'lucide-react';
import { dataStore } from '../lib/storage';
import { Honoree, TeamMember } from '../types';

export const LibrarianSpotlightAfricaPage: React.FC = () => {
  const [honorees, setHonorees] = useState<Honoree[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [activeTab, setActiveTab] = useState<'about' | 'honorees' | 'nominate' | 'impact'>('about');
  
  // Nomination form state
  const [nomination, setNomination] = useState({
    nomineeName: '',
    nomineeEmail: '',
    nomineeCountry: '',
    nomineeInstitution: '',
    nomineeRole: '',
    reason: '',
    nominatorName: '',
    nominatorEmail: ''
  });
  const [nominationSubmitted, setNominationSubmitted] = useState(false);

  // Impact survey state
  const [survey, setSurvey] = useState({
    name: '',
    productivityRating: 5,
    connectionsRating: 5,
    techSavvyRating: 5,
    selfAwarenessRating: 5,
    comments: ''
  });
  const [surveySubmitted, setSurveySubmitted] = useState(false);

  useEffect(() => {
    Promise.all([
      dataStore.getHonorees(),
      dataStore.getTeamMembers()
    ]).then(([hList, tList]) => {
      setHonorees(hList);
      setTeam(tList.filter(t => t.initiative === 'lsa' || t.id === 'team-1'));
    });
  }, []);

  const handleNominateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dataStore.saveSubmission({
      form_type: 'lsa_nomination',
      data: nomination
    });
    setNominationSubmitted(true);
  };

  const handleSurveySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dataStore.saveSubmission({
      form_type: 'lsa_impact',
      data: survey
    });
    setSurveySubmitted(true);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Banner with LSA Identity */}
      <div className="bg-brand-dark text-white py-16 lg:py-24 border-b border-blue-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute top-1/2 -right-10 w-96 h-96 bg-brand-blue rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-2">
              <div className="bg-white p-3 rounded-2xl shadow-xl border border-blue-900/40 w-fit max-w-[220px]">
                <img 
                  src="/images/lsa-logo.png" 
                  alt="Librarian Spotlight Africa Logo" 
                  className="h-16 sm:h-20 w-auto object-contain"
                />
              </div>
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 bg-brand-blue/20 text-brand-blue border border-brand-blue/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5" />
                  <span>Flagship Pan-African Initiative</span>
                </div>
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-tight">
                  Librarian Spotlight Africa
                </h1>
              </div>
            </div>

            <p className="font-serif italic text-xl sm:text-2xl text-brand-blue">
              “Amplifying Impact to Inspire Positive Change”
            </p>

            <p className="text-base text-slate-300 leading-relaxed max-w-2xl pt-2 font-normal">
              A leading initiative birthed by Sylvester Ebhonu (The Digital Librarian) dedicated to recognizing and celebrating the exemplary contributions of librarians across the African continent through storytelling and monthly live-streamed interviews.
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => setActiveTab('nominate')}
                className="bg-brand-blue hover:bg-brand-blue-hover text-white px-6 py-3 rounded-lg text-sm font-bold shadow-md transition-all active:scale-95"
              >
                Nominate a Librarian / Honoree
              </button>
              <button
                onClick={() => setActiveTab('impact')}
                className="border border-white/80 hover:bg-white hover:text-brand-dark text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all"
              >
                Take Impact Survey
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Digital Dashboard Metrics (From PDF 1, Page 2) */}
      <div className="bg-slate-50 border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">
            LSA Digital Dashboard
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-300 shadow-sm">
              <div className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark">11</div>
              <div className="text-xs sm:text-sm font-semibold text-brand-blue mt-1">Total Honorees Recognized</div>
              <div className="text-xs text-slate-500 mt-1">Celebrating African library innovators since February 2024.</div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-300 shadow-sm">
              <div className="font-serif text-3xl sm:text-4xl font-bold text-brand-blue">1,500+</div>
              <div className="text-xs sm:text-sm font-semibold text-brand-dark mt-1">Combined Views & Interactions</div>
              <div className="text-xs text-slate-500 mt-1">Through live-streamed interviews and community broadcasts.</div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-300 shadow-sm">
              <div className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark">2</div>
              <div className="text-xs sm:text-sm font-semibold text-brand-blue mt-1">Active Ongoing Projects</div>
              <div className="text-xs text-slate-500 mt-1">Including Google My Library & Mentorship Programmes.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-slate-200 sticky top-20 bg-white z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-8 overflow-x-auto text-sm font-semibold">
          <button
            onClick={() => setActiveTab('about')}
            className={`py-4 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'about' ? 'border-brand-blue text-brand-blue' : 'border-transparent text-slate-600 hover:text-brand-dark'
            }`}
          >
            About & Objectives
          </button>
          <button
            onClick={() => setActiveTab('honorees')}
            className={`py-4 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'honorees' ? 'border-brand-blue text-brand-blue' : 'border-transparent text-slate-600 hover:text-brand-dark'
            }`}
          >
            Honorees & Spotlight ({honorees.length})
          </button>
          <button
            onClick={() => setActiveTab('nominate')}
            className={`py-4 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'nominate' ? 'border-brand-blue text-brand-blue' : 'border-transparent text-slate-600 hover:text-brand-dark'
            }`}
          >
            Nominate Honoree
          </button>
          <button
            onClick={() => setActiveTab('impact')}
            className={`py-4 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'impact' ? 'border-brand-blue text-brand-blue' : 'border-transparent text-slate-600 hover:text-brand-dark'
            }`}
          >
            Impact & Review Survey
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* TAB 1: ABOUT & OBJECTIVES */}
        {activeTab === 'about' && (
          <div className="space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-8 space-y-6 text-slate-700 leading-relaxed text-base">
                <h2 className="font-serif text-3xl font-bold text-brand-dark">
                  Why Librarian Spotlight Africa?
                </h2>
                <p>
                  Librarians in Africa do so much in promoting information and digital literacy, knowledge management, and addressing critical societal challenges like education inequality and information access. Yet their relevance seems to not be well represented due to the outdated stereotype of them as passive book keepers.
                </p>
                <p>
                  This underrepresentation of librarians in Africa is a serious problem. It makes many people see libraries as just book storage facilities rather than centers of learning, creativity, and community development.
                </p>
                <p>
                  <strong>Librarian Spotlight Africa (LSA)</strong> seeks to address these issues by shining a spotlight on the exemplary contributions of African librarians—providing them a platform to share their experiences to not only inspire the next generation, but also to shape the future of libraries throughout Africa.
                </p>

                <div className="pt-4 border-t border-slate-200">
                  <h3 className="font-serif text-2xl font-bold text-brand-dark mb-3">
                    Vision & Objectives
                  </h3>
                  <p className="bg-slate-50 p-5 rounded-xl border-l-4 border-brand-blue italic text-slate-800">
                    “To establish a unified platform that amplifies the impact of outstanding librarians and information professionals across Africa for their exemplary contributions to the Library and Information Science Field, inspiring innovation and transforming the perception of librarianship globally.”
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <h3 className="font-serif text-2xl font-bold text-brand-dark mb-3">
                    Selection Process & Eligibility
                  </h3>
                  <p>
                    The programme is open to librarians, archivists, information scientists, and professionals actively engaged in promoting knowledge, literacy, and access to information across Africa.
                  </p>
                  <p className="mt-2">
                    Nominations for the <strong>Librarian of the Month</strong> come from three key sources:
                  </p>
                  <ul className="list-disc list-inside space-y-1 mt-2 text-slate-700">
                    <li>Members of the library and academic community</li>
                    <li>Self-nominations by practicing professionals</li>
                    <li>The LSA Evaluation Committee, who play a major role in the final selection process</li>
                  </ul>
                  <p className="mt-2 text-xs text-slate-500">
                    Successful nominees are contacted via email and scheduled for their live-streamed feature interview.
                  </p>
                </div>
              </div>

              {/* Sidebar with LSA Initiatives & Ongoing Project */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-slate-50 rounded-2xl border-2 border-brand-dark p-6 space-y-4">
                  <h3 className="font-serif text-xl font-bold text-brand-dark">
                    LSA Movement Initiatives
                  </h3>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-brand-blue mt-0.5 flex-shrink-0" />
                      <span>Capacity Building & Mentorship Programmes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-brand-blue mt-0.5 flex-shrink-0" />
                      <span>Research and Advocacy Initiatives</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-brand-blue mt-0.5 flex-shrink-0" />
                      <span>Community Engagement Projects</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-brand-blue mt-0.5 flex-shrink-0" />
                      <span>Monthly Recognition Programs</span>
                    </li>
                  </ul>

                  <div className="pt-4 border-t border-slate-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">Ongoing Project</span>
                    <div className="font-serif text-lg font-bold text-brand-dark mt-0.5">
                      Google My Library
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      Enabling African libraries to claim, optimize, and map their physical collections and digital services onto Google Search and Maps.
                    </p>
                  </div>
                </div>

                {/* Support & Donate Block */}
                <div className="bg-brand-blue-light/50 rounded-2xl border border-brand-blue/30 p-6 space-y-3">
                  <div className="flex items-center gap-2 text-brand-blue font-bold text-xs uppercase tracking-wider">
                    <Heart className="w-4 h-4" />
                    <span>Support the Mission</span>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-brand-dark">
                    Support & Donate to LSA
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Help us fund travel grants, high-speed streaming infrastructure, and honorarium awards for African library changemakers.
                  </p>
                  <Link
                    to="/contact?subject=donate"
                    className="inline-block w-full text-center bg-brand-dark hover:bg-brand-blue text-white py-2.5 rounded-lg text-xs font-bold transition-colors"
                  >
                    Donate / Partner with LSA
                  </Link>
                </div>
              </div>
            </div>

            {/* LSA Team Section (From PDF 1, Page 3) */}
            <div className="pt-12 border-t border-slate-200">
              <div className="max-w-2xl mb-8">
                <span className="text-xs uppercase tracking-widest text-brand-blue font-bold">LSA Committee</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark mt-1">
                  Our Leadership & Evaluation Team
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {team.map((member) => (
                  <div key={member.id} className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:border-brand-blue transition-all flex flex-col justify-between">
                    <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                      {member.photo_url ? (
                        <img 
                          src={member.photo_url} 
                          alt={member.name}
                          className="w-full h-full object-cover object-top"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-brand-dark text-white font-serif text-3xl font-bold">
                          {member.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="font-serif text-lg font-bold text-brand-dark">{member.name}</div>
                        <div className="text-xs font-semibold text-brand-blue mt-0.5">{member.role}</div>
                        {member.organization && (
                          <div className="text-[11px] text-slate-500 mt-0.5">{member.organization}</div>
                        )}
                        <p className="text-xs text-slate-600 mt-2 leading-relaxed">{member.bio}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: HONOREES & SPOTLIGHT */}
        {activeTab === 'honorees' && (
          <div className="space-y-8">
            <div className="max-w-2xl">
              <h2 className="font-serif text-3xl font-bold text-brand-dark">
                African Librarians of the Month
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Celebrating exceptional practitioners transforming knowledge access across African nations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {honorees.map((honoree) => (
                <div
                  key={honoree.id}
                  className="bg-white rounded-2xl border-2 border-brand-dark p-6 shadow-md flex flex-col sm:flex-row gap-6 items-start"
                >
                  <div className="w-full sm:w-36 h-44 bg-slate-200 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={honoree.photo_url}
                      alt={honoree.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-blue-light text-brand-blue px-2.5 py-1 rounded-full">
                      {honoree.month} {honoree.year} Honoree · {honoree.country}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-brand-dark">
                      {honoree.name}
                    </h3>
                    <div className="text-xs text-slate-600 font-medium">
                      {honoree.role}, {honoree.institution}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed pt-1">
                      {honoree.bio}
                    </p>
                    {honoree.featured_quote && (
                      <p className="text-xs italic text-brand-dark font-serif border-l-2 border-brand-blue pl-2 pt-1 mt-2">
                        "{honoree.featured_quote}"
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: NOMINATION FORM */}
        {activeTab === 'nominate' && (
          <div className="max-w-2xl mx-auto bg-slate-50 p-8 rounded-2xl border-2 border-brand-dark shadow-sm">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark text-center">
              Nominate a Librarian / Honoree
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 text-center mt-2 max-w-md mx-auto">
              Do you know an outstanding African librarian or information scientist transforming their community? Nominate them or submit a self-nomination.
            </p>

            {nominationSubmitted ? (
              <div className="mt-8 text-center p-6 bg-emerald-50 rounded-xl border border-emerald-200">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h3 className="font-serif text-xl font-bold text-emerald-900">Nomination Submitted!</h3>
                <p className="text-xs text-emerald-700 mt-1">
                  Thank you. Our Evaluation Committee reviews all nominations for the upcoming monthly feature.
                </p>
              </div>
            ) : (
              <form onSubmit={handleNominateSubmit} className="mt-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Nominee Full Name *</label>
                    <input
                      type="text"
                      required
                      value={nomination.nomineeName}
                      onChange={e => setNomination({ ...nomination, nomineeName: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Nominee Email *</label>
                    <input
                      type="email"
                      required
                      value={nomination.nomineeEmail}
                      onChange={e => setNomination({ ...nomination, nomineeEmail: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Country in Africa *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Nigeria, Ghana, Kenya..."
                      value={nomination.nomineeCountry}
                      onChange={e => setNomination({ ...nomination, nomineeCountry: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Institution / Library *</label>
                    <input
                      type="text"
                      required
                      value={nomination.nomineeInstitution}
                      onChange={e => setNomination({ ...nomination, nomineeInstitution: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Why does this librarian deserve to be featured? *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe their transformational projects, digital initiatives, community literacy achievements..."
                    value={nomination.reason}
                    onChange={e => setNomination({ ...nomination, reason: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name (Nominator)</label>
                    <input
                      type="text"
                      value={nomination.nominatorName}
                      onChange={e => setNomination({ ...nomination, nominatorName: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Email</label>
                    <input
                      type="email"
                      value={nomination.nominatorEmail}
                      onChange={e => setNomination({ ...nomination, nominatorEmail: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-blue hover:bg-brand-blue-hover text-white py-3 rounded-lg text-sm font-bold shadow-md transition-all active:scale-95"
                >
                  Submit Nomination
                </button>
              </form>
            )}
          </div>
        )}

        {/* TAB 4: IMPACT & REVIEW SURVEY */}
        {activeTab === 'impact' && (
          <div className="max-w-2xl mx-auto bg-slate-50 p-8 rounded-2xl border-2 border-brand-dark shadow-sm">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark text-center">
              LSA Impact Assessment Survey
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 text-center mt-2 max-w-lg mx-auto">
              If you have encountered Sylvester Ebhonu or any of the LSA programmes, please rate the transformations and impacts you have experienced on a scale of 1 ("Not at all") to 5 ("Significantly").
            </p>

            {surveySubmitted ? (
              <div className="mt-8 text-center p-6 bg-emerald-50 rounded-xl border border-emerald-200">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h3 className="font-serif text-xl font-bold text-emerald-900">Thank You For Your Insights!</h3>
                <p className="text-xs text-emerald-700 mt-1">
                  Your feedback helps shape future LSA programmes and institutional grant reporting.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSurveySubmit} className="mt-8 space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name / Title (Optional)</label>
                  <input
                    type="text"
                    value={survey.name}
                    onChange={e => setSurvey({ ...survey, name: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
                    placeholder="e.g. Dr. Grace / Academic Librarian"
                  />
                </div>

                {/* Rating 1: Enhanced Professional Productivity */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-800 mb-1">
                    <span>Enhanced Professional Productivity:</span>
                    <span className="text-brand-blue font-bold">{survey.productivityRating} / 5</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={survey.productivityRating}
                    onChange={e => setSurvey({ ...survey, productivityRating: parseInt(e.target.value) })}
                    className="w-full accent-brand-blue"
                  />
                </div>

                {/* Rating 2: Improved Interpersonal Connections */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-800 mb-1">
                    <span>Improved Interpersonal Connections & Network:</span>
                    <span className="text-brand-blue font-bold">{survey.connectionsRating} / 5</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={survey.connectionsRating}
                    onChange={e => setSurvey({ ...survey, connectionsRating: parseInt(e.target.value) })}
                    className="w-full accent-brand-blue"
                  />
                </div>

                {/* Rating 3: Got More IT & Tech Savvy */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-800 mb-1">
                    <span>Got More IT & Tech Savvy:</span>
                    <span className="text-brand-blue font-bold">{survey.techSavvyRating} / 5</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={survey.techSavvyRating}
                    onChange={e => setSurvey({ ...survey, techSavvyRating: parseInt(e.target.value) })}
                    className="w-full accent-brand-blue"
                  />
                </div>

                {/* Rating 4: I Became More Self-Aware */}
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-800 mb-1">
                    <span>I Became More Self-Aware & Purpose-Driven:</span>
                    <span className="text-brand-blue font-bold">{survey.selfAwarenessRating} / 5</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={survey.selfAwarenessRating}
                    onChange={e => setSurvey({ ...survey, selfAwarenessRating: parseInt(e.target.value) })}
                    className="w-full accent-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Additional Comments / Reflections</label>
                  <textarea
                    rows={3}
                    value={survey.comments}
                    onChange={e => setSurvey({ ...survey, comments: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-blue"
                    placeholder="Share any specific breakthrough or outcome..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-blue hover:bg-brand-blue-hover text-white py-3 rounded-lg text-sm font-bold shadow-md transition-all active:scale-95"
                >
                  Submit Impact Survey
                </button>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
