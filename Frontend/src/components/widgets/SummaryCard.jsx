// src/components/widgets/SummaryCard.jsx
import React from "react";
import { Calendar, FileText, Clock, Users, CheckCircle } from "lucide-react";

const SummaryCard = ({ 
  title, 
  description, 
  items = [], 
  emptyMessage = "No data available",
  type = "activities" 
}) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'assignments': return Calendar;
      case 'activities': return FileText;
      case 'grades': return CheckCircle;
      default: return FileText;
    }
  };

  const getActivityIcon = (activityType) => {
    switch (activityType) {
      case 'grading': return CheckCircle;
      case 'submission': return FileText;
      case 'announcement': return Users;
      default: return FileText;
    }
  };

  const isDueSoon = (dueDate) => {
    if (!dueDate) return false;
    const due = new Date(dueDate);
    const twoDaysFromNow = new Date();
    twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);
    return due <= twoDaysFromNow;
  };

  const Icon = getIcon();

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon size={20} className="text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      
      {description && (
        <p className="text-sm text-gray-500 mb-4">{description}</p>
      )}
      
      <div className="space-y-3">
        {items.length > 0 ? (
          items.map((item, idx) => {
            const ActivityIcon = getActivityIcon(item.type);
            
            return (
              <div 
                key={item.id || idx} 
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-3">
                    {type === 'activities' ? (
                      <ActivityIcon size={16} className="flex-shrink-0 mt-1 text-blue-600" />
                    ) : type === 'assignments' ? (
                      <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                        isDueSoon(item.dueDate) ? 'bg-red-500' : 'bg-blue-500'
                      }`}></div>
                    ) : (
                      <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-800">
                          {item.title || item.action || item.label || 'Untitled'}
                        </p>
                        {type === 'assignments' && isDueSoon(item.dueDate) && (
                          <div className="flex items-center gap-1 bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">
                            <Clock size={12} />
                            <span>Due Soon</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.courseName || item.course}
                        {item.dueDate && ` • Due: ${formatDate(item.dueDate)}`}
                        {item.date && ` • ${formatDate(item.date)}`}
                      </p>
                      {item.description && (
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex-shrink-0 ml-4 text-right">
                  {type === 'assignments' && item.dueDate && (
                    <div className="text-right">
                      <span className={`text-sm font-medium ${
                        isDueSoon(item.dueDate) ? 'text-red-600' : 'text-gray-700'
                      }`}>
                        Due {formatDate(item.dueDate)}
                      </span>
                    </div>
                  )}
                  {type === 'activities' && item.date && (
                    <span className="text-sm text-gray-500">
                      {formatDate(item.date)}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8">
            <Icon size={32} className="text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 text-sm">{emptyMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;