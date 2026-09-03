import React, { useState } from 'react';
import { MOCK_BLOGS } from '../../data/blogs';
import { useParams, Link } from 'react-router-dom';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Search, BookOpen, Download, ArrowRight, Clock, User, ShieldCheck } from 'lucide-react';
import { useToast } from '../../app/providers/ToastContext';

export const ResourcesPage: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { showToast } = useToast();

  const categories = [
    { id: 'all', label: 'All Resources' },
    { id: 'borrower-guide', label: 'Borrower Guides' },
    { id: 'credit-score', label: 'CIBIL & Credit Score' },
    { id: 'msme', label: 'MSME & Business Finance' },
    { id: 'regulatory', label: 'RBI Guidelines' },
  ];

  const downloadableGuides = [
    { title: 'MSME Loan Application Document Checklist', fileSize: '1.2 MB', category: 'PDF Checklist', desc: 'Complete checklist of 18 documents required for hassle-free working capital loan sanction.' },
    { title: 'Home Loan Balance Transfer ROI Calculator Sheet', fileSize: '850 KB', category: 'Excel Tool', desc: 'Calculate net interest savings before switching your home loan lender.' },
    { title: 'CIBIL Score Rectification & Dispute Guide 2026', fileSize: '2.1 MB', category: 'PDF Guide', desc: 'Step-by-step procedure to raise disputes for inaccurate CIBIL credit report entries.' },
    { title: 'RBI Digital Lending Guidelines Borrower Factsheet', fileSize: '950 KB', category: 'Regulatory PDF', desc: 'Summary of Key Fact Statements (KFS), APR limits, and zero-hidden-fee rules.' },
  ];

  const handleDownload = (title: string) => {
    showToast(`Downloading "${title}"...`, 'info');
    setTimeout(() => {
      showToast(`Downloaded "${title}" successfully!`, 'success');
    }, 800);
  };

  const selectedBlog = MOCK_BLOGS.find((b) => b.slug === slug);

  if (slug && selectedBlog) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="space-y-4">
          <Link to="/resources" className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1">
            ← Back to Knowledge Hub
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase border border-blue-100">
              {selectedBlog.categoryLabel}
            </span>
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {selectedBlog.readTime}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">{selectedBlog.title}</h1>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold border-b border-slate-200 pb-4">
            <User className="w-4 h-4 text-slate-400" />
            <span>Authored by {selectedBlog.author} ({selectedBlog.authorRole}) • Published {selectedBlog.publishedDate.substring(0, 10)}</span>
          </div>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-fintech text-sm text-slate-700 leading-relaxed space-y-6">
          <p className="font-semibold text-slate-900 text-base leading-relaxed bg-blue-50/40 p-4 rounded-2xl border border-blue-100/60">
            {selectedBlog.excerpt}
          </p>
          <div className="border-l-4 border-emerald-500 pl-4 py-2 bg-emerald-50/50 rounded-r-2xl text-xs font-medium text-slate-800">
            <strong>Key Summary:</strong> Reviewing your eligibility criteria and keeping clean KYC/income records reduces loan approval turnaround time and interest margins.
          </div>
          <div className="whitespace-pre-line text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
            {selectedBlog.content}
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <span className="text-xs text-slate-500 font-medium">FinServe Knowledge Hub • Verified Financial Content</span>
            </div>
            <Link to="/check-eligibility">
              <Button size="sm" variant="gradient" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Check Loan Eligibility Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const filteredBlogs = MOCK_BLOGS.filter((b) => {
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || b.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-16 py-12">
      {/* Dark Header Banner */}
      <section className="bg-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-900 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[130px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto space-y-4 text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-extrabold border border-blue-500/20">
            <BookOpen className="w-3.5 h-3.5" /> Financial Literacy & Regulatory Knowledge Hub
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">Resources & Knowledge Hub</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto font-normal">
            Step-by-step guides, RBI policy breakdowns, credit score optimization tips, and downloadable loan documentation tools.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Category Tabs & Search Bar Toolbar */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-fintech flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
                  selectedCategory === c.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="w-full md:w-72">
            <Input
              placeholder="Search guides, CIBIL, MSME..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-4 h-4 text-slate-400" />}
            />
          </div>
        </div>

        {/* Filtered Articles Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900">
              {selectedCategory === 'all'
                ? 'All Knowledge Resources'
                : categories.find((c) => c.id === selectedCategory)?.label}{' '}
              <span className="text-xs font-normal text-slate-500">({filteredBlogs.length} articles)</span>
            </h2>
          </div>

          {filteredBlogs.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
              <Search className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-700">No resources found matching your search</p>
              <p className="text-xs text-slate-500">Try clearing your search query or selecting "All Resources"</p>
              <Button size="sm" variant="outline" onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}>
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredBlogs.map((blog) => (
                <div
                  key={blog.id}
                  className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-fintech hover:shadow-xl hover:border-blue-500/30 transition-all duration-300 flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold text-blue-600 bg-blue-50 px-3 py-1 rounded-full uppercase border border-blue-100">
                        {blog.categoryLabel}
                      </span>
                      <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {blog.readTime}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                      <Link to={`/resources/blog/${blog.slug}`}>{blog.title}</Link>
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed font-normal line-clamp-3">{blog.excerpt}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-medium">By {blog.author}</span>
                    <Link
                      to={`/resources/blog/${blog.slug}`}
                      className="text-xs font-extrabold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
                    >
                      Read Full Guide <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Downloadable Checklists & Tools */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 space-y-6 shadow-xl border border-slate-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-white">Downloadable Credit Tools & Checklists</h3>
              <p className="text-xs text-slate-400">Free downloadable PDF checklists and Excel calculation tools</p>
            </div>
            <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Instant PDF / Excel
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {downloadableGuides.map((guide, idx) => (
              <div key={idx} className="bg-slate-800/90 p-5 rounded-2xl border border-slate-700/80 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded uppercase">
                      {guide.category}
                    </span>
                    <span className="text-[10px] text-slate-400">{guide.fileSize}</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">{guide.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-normal">{guide.desc}</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDownload(guide.title)}
                  leftIcon={<Download className="w-3.5 h-3.5 text-emerald-400" />}
                  className="text-white border-slate-700 hover:bg-slate-700 shrink-0 text-xs"
                >
                  Download
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
