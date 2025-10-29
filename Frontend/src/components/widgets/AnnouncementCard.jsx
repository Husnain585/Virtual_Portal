// src/components/widgets/AnnouncementCard.jsx
import React from "react";
import { Bell, Calendar, Edit3, Trash2, Users } from "lucide-react";
import { useToast } from "../../context/ToastContext";
import { deleteAnnouncement } from "../../api/announcement.api";

const AnnouncementCard = ({ 
  announcements = [], 
  emptyMessage = "No announcements",
  showActions = false,
  onEdit,
  onDelete 
}) => {
  const { success, error } = useToast();

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

  const handleDelete = async (id) => {
    try {
      await deleteAnnouncement(id);
      success("Announcement deleted successfully");
      if (onDelete) onDelete();
    } catch (err) {
      error("Failed to delete announcement");
    }
  };

  const getTargetRolesText = (roles) => {
    if (!roles || roles.length === 0) return "All Users";
    return roles.map(role => role.charAt(0).toUpperCase() + role.slice(1)).join(", ");
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex items-center gap-2 mb-4">
        <Bell size={20} className="text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-800">Announcements</h3>
      </div>
      
      <p className="text-sm text-gray-500 mb-4">System-wide announcements and updates</p>
      
      <div className="space-y-4">
        {announcements.length > 0 ? (
          announcements.map((announcement) => (
            <div 
              key={announcement.id} 
              className="p-4 bg-gray-50 rounded-lg border-l-4 border-purple-500 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-gray-800 text-sm flex-1">
                  {announcement.title}
                </h4>
                {showActions && (
                  <div className="flex items-center gap-2 ml-2">
                    <button 
                      onClick={() => onEdit && onEdit(announcement)}
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button 
                      onClick={() => handleDelete(announcement.id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                )}
              </div>
              
              <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                {announcement.body}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-4">
                  {announcement.startDate && (
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>From: {formatDate(announcement.startDate)}</span>
                    </div>
                  )}
                  {announcement.endDate && (
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>To: {formatDate(announcement.endDate)}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-1">
                  <Users size={12} />
                  <span>{getTargetRolesText(announcement.targetRoles)}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Bell size={32} className="text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500 text-sm">{emptyMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementCard;