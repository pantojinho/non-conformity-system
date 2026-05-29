'use client';

import { useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from '@/i18n';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  User,
  Tag,
  FileText,
  Clock,
  Paperclip,
  Send,
  ArrowLeft,
  Plus,
  X,
  Upload,
  AlertTriangle,
} from 'lucide-react';

interface FilePreview {
  file: File;
  id: string;
}

export default function NewComplaintPage() {
  const t = useTranslations();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<FilePreview[]>([]);

  // Client Info
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientCompany, setClientCompany] = useState('');

  // Classification
  const [complaintType, setComplaintType] = useState('');
  const [severity, setSeverity] = useState('');
  const [processArea, setProcessArea] = useState('');

  // Details
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [rootCause, setRootCause] = useState('');

  // SLA
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  // Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};

    if (!clientName.trim()) newErrors.clientName = t('complaintForm.errors.required');
    if (!clientEmail.trim()) newErrors.clientEmail = t('complaintForm.errors.required');
    if (!complaintType) newErrors.complaintType = t('complaintForm.errors.required');
    if (!severity) newErrors.severity = t('complaintForm.errors.required');
    if (!subject.trim()) newErrors.subject = t('complaintForm.errors.required');
    if (!description.trim() || description.trim().length < 10)
      newErrors.description = t('complaintForm.errors.minDescription');
    if (!priority) newErrors.priority = t('complaintForm.errors.required');
    if (!dueDate) newErrors.dueDate = t('complaintForm.errors.required');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [clientName, clientEmail, complaintType, severity, subject, description, priority, dueDate, t]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        file,
        id: `${file.name}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      }));
      setFiles((prev) => [...prev, ...newFiles]);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) return;

      setIsSubmitting(true);
      try {
        // TODO: API call to create complaint
        // const formData = {
        //   clientName, clientEmail, clientPhone, clientCompany,
        //   complaintType, severity, processArea,
        //   subject, description, rootCause,
        //   priority, dueDate, assignedTo,
        //   files: files.map(f => f.file),
        // };
        // await createComplaint(formData);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        router.push('/complaints');
      } catch {
        setErrors({ submit: t('complaintForm.errors.submitFailed') });
      } finally {
        setIsSubmitting(false);
      }
    },
    [validate, router, t]
  );

  const complaintTypeOptions = [
    { value: 'nps', label: t('complaintForm.types.nps') },
    { value: 'complaint', label: t('complaintForm.types.complaint') },
    { value: 'suggestion', label: t('complaintForm.types.suggestion') },
    { value: 'praise', label: t('complaintForm.types.praise') },
  ];

  const severityOptions = [
    { value: 'low', label: t('complaintForm.severity.low') },
    { value: 'medium', label: t('complaintForm.severity.medium') },
    { value: 'high', label: t('complaintForm.severity.high') },
    { value: 'critical', label: t('complaintForm.severity.critical') },
  ];

  const processAreaOptions = [
    { value: 'production', label: t('complaintForm.processAreas.production') },
    { value: 'quality', label: t('complaintForm.processAreas.quality') },
    { value: 'logistics', label: t('complaintForm.processAreas.logistics') },
    { value: 'engineering', label: t('complaintForm.processAreas.engineering') },
    { value: 'commercial', label: t('complaintForm.processAreas.commercial') },
    { value: 'afterSales', label: t('complaintForm.processAreas.afterSales') },
  ];

  const priorityOptions = [
    { value: 'low', label: t('complaintForm.priority.low') },
    { value: 'medium', label: t('complaintForm.priority.medium') },
    { value: 'high', label: t('complaintForm.priority.high') },
    { value: 'urgent', label: t('complaintForm.priority.urgent') },
  ];

  const assigneeOptions = [
    { value: 'auto', label: t('complaintForm.assignee.autoAssign') },
    { value: 'quality-team', label: t('complaintForm.assignee.qualityTeam') },
    { value: 'production-team', label: t('complaintForm.assignee.productionTeam') },
    { value: 'engineering-team', label: t('complaintForm.assignee.engineeringTeam') },
    { value: 'commercial-team', label: t('complaintForm.assignee.commercialTeam') },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-12">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('complaintForm.title')}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              {t('complaintForm.subtitle')}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        {/* ─── Section 1: Client Info ─── */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-rose-600 dark:text-rose-400" />
              <CardTitle>{t('complaintForm.sections.clientInfo')}</CardTitle>
            </div>
            <CardDescription>{t('complaintForm.sections.clientInfoDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label={t('complaintForm.fields.clientName')}
                placeholder={t('complaintForm.placeholders.clientName')}
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                error={errors.clientName}
                required
              />
              <Input
                label={t('complaintForm.fields.clientEmail')}
                type="email"
                placeholder={t('complaintForm.placeholders.clientEmail')}
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                error={errors.clientEmail}
                required
              />
              <Input
                label={t('complaintForm.fields.clientPhone')}
                type="tel"
                placeholder={t('complaintForm.placeholders.clientPhone')}
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
              />
              <Input
                label={t('complaintForm.fields.clientCompany')}
                placeholder={t('complaintForm.placeholders.clientCompany')}
                value={clientCompany}
                onChange={(e) => setClientCompany(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* ─── Section 2: Classification ─── */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Tag className="h-5 w-5 text-rose-600 dark:text-rose-400" />
              <CardTitle>{t('complaintForm.sections.classification')}</CardTitle>
            </div>
            <CardDescription>{t('complaintForm.sections.classificationDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select
                label={t('complaintForm.fields.complaintType')}
                placeholder={t('complaintForm.placeholders.selectType')}
                options={complaintTypeOptions}
                value={complaintType}
                onChange={(e) => setComplaintType(e.target.value)}
                error={errors.complaintType}
                required
              />
              <Select
                label={t('complaintForm.fields.severity')}
                placeholder={t('complaintForm.placeholders.selectSeverity')}
                options={severityOptions}
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                error={errors.severity}
                required
              />
              <Select
                label={t('complaintForm.fields.processArea')}
                placeholder={t('complaintForm.placeholders.selectProcessArea')}
                options={processAreaOptions}
                value={processArea}
                onChange={(e) => setProcessArea(e.target.value)}
              />
            </div>

            {/* Severity warning */}
            {severity === 'critical' && (
              <div className="mt-4 flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                <p className="text-sm text-red-700 dark:text-red-300">
                  {t('complaintForm.messages.criticalWarning')}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* ─── Section 3: Details ─── */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-rose-600 dark:text-rose-400" />
              <CardTitle>{t('complaintForm.sections.details')}</CardTitle>
            </div>
            <CardDescription>{t('complaintForm.sections.detailsDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                label={t('complaintForm.fields.subject')}
                placeholder={t('complaintForm.placeholders.subject')}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                error={errors.subject}
                required
              />
              <Textarea
                label={t('complaintForm.fields.description')}
                placeholder={t('complaintForm.placeholders.description')}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                error={errors.description}
                required
              />
              <Textarea
                label={t('complaintForm.fields.rootCause')}
                placeholder={t('complaintForm.placeholders.rootCause')}
                value={rootCause}
                onChange={(e) => setRootCause(e.target.value)}
                rows={3}
                helperText={t('complaintForm.helpers.rootCause')}
              />
            </div>
          </CardContent>
        </Card>

        {/* ─── Section 4: SLA ─── */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-rose-600 dark:text-rose-400" />
              <CardTitle>{t('complaintForm.sections.sla')}</CardTitle>
            </div>
            <CardDescription>{t('complaintForm.sections.slaDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select
                label={t('complaintForm.fields.priority')}
                placeholder={t('complaintForm.placeholders.selectPriority')}
                options={priorityOptions}
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                error={errors.priority}
                required
              />
              <Input
                label={t('complaintForm.fields.dueDate')}
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                error={errors.dueDate}
                required
              />
              <Select
                label={t('complaintForm.fields.assignedTo')}
                placeholder={t('complaintForm.placeholders.selectAssignee')}
                options={assigneeOptions}
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* ─── Section 5: Evidence Upload ─── */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Paperclip className="h-5 w-5 text-rose-600 dark:text-rose-400" />
              <CardTitle>{t('complaintForm.sections.evidence')}</CardTitle>
            </div>
            <CardDescription>{t('complaintForm.sections.evidenceDesc')}</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Drop zone */}
            <div
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-rose-400 dark:hover:border-rose-500 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-10 w-10 mx-auto text-gray-400 dark:text-gray-500 mb-3" />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('complaintForm.messages.dropFiles')}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {t('complaintForm.messages.fileLimit')}
              </p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,.pdf,.doc,.docx,.xls,.xlsx"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {/* File list */}
            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                {files.map((f) => (
                  <div
                    key={f.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Paperclip className="h-4 w-4 text-gray-400 shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                        {f.file.name}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 shrink-0">
                        ({formatFileSize(f.file.size)})
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(f.id)}
                      className="p-1 rounded text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors shrink-0"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* ─── Submit ─── */}
        <div className="flex items-center justify-end gap-3 pt-2">
          {errors.submit && (
            <p className="text-sm text-red-600 dark:text-red-400 mr-auto">{errors.submit}</p>
          )}
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
            leftIcon={<X className="h-4 w-4" />}
          >
            {t('common.cancel')}
          </Button>
          <Button
            type="submit"
            isLoading={isSubmitting}
            className="bg-[#FF000F] hover:bg-[#D5000C] dark:bg-[#FF000F] dark:hover:bg-[#D5000C] text-white"
            leftIcon={<Send className="h-4 w-4" />}
          >
            {t('complaintForm.actions.submit')}
          </Button>
        </div>
      </form>
    </div>
  );
}
