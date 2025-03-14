import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../utils/db';
import Event from '../../../models/Event';
import mongoose from 'mongoose';
import { isAuthenticated } from '../../../utils/auth';

/**
 * API endpoint for individual event operations
 * 
 * GET: Retrieve a specific event by ID
 * PUT: Update an event by ID (includes approval)
 * DELETE: Remove an event by ID
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connectToDatabase();
    
    // Check authentication for all operations on this endpoint
    if (!isAuthenticated(req)) {
      return res.status(401).json({ 
        success: false, 
        message: 'Unauthorized. Admin authentication required.' 
      });
    }

    const { id } = req.query;
    
    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(id as string)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid event ID format' 
      });
    }
    
    // Handle different HTTP methods
    switch (req.method) {
      case 'GET':
        return await getEvent(req, res, id as string);
      case 'PUT':
        return await updateEvent(req, res, id as string);
      case 'DELETE':
        return await deleteEvent(req, res, id as string);
      default:
        return res.status(405).json({ 
          success: false, 
          message: `Method ${req.method} not allowed` 
        });
    }
  } catch (error) {
    console.error('Error in event API:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error', 
      error: (error as Error).message 
    });
  }
}

/**
 * GET handler to retrieve a specific event
 */
async function getEvent(
  req: NextApiRequest, 
  res: NextApiResponse, 
  id: string
) {
  try {
    const event = await Event.findById(id);
    
    if (!event) {
      return res.status(404).json({ 
        success: false, 
        message: 'Event not found' 
      });
    }
    
    // For non-admin requests, only return approved events
    const { adminRequest = 'false' } = req.query;
    if (adminRequest !== 'true' && !event.approved) {
      return res.status(404).json({ 
        success: false, 
        message: 'Event not found or not yet approved' 
      });
    }
    
    return res.status(200).json({ 
      success: true, 
      data: event 
    });
  } catch (error) {
    console.error('Error fetching event:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error fetching event', 
      error: (error as Error).message 
    });
  }
}

/**
 * PUT handler to update an event
 * Includes special handling for approval operations
 */
async function updateEvent(
  req: NextApiRequest, 
  res: NextApiResponse, 
  id: string
) {
  try {
    console.log(`Processing update for event ${id}`);
    console.log('Request body:', req.body);
    
    const { action, adminName } = req.body;
    
    // Check if this is an approval action
    if (action === 'approve' || action === 'reject') {
      console.log(`Processing ${action} action by ${adminName}`);
      
      // First, check if the event exists and isn't already in the desired state
      const existingEvent = await Event.findById(id);
      if (!existingEvent) {
        console.log('Event not found');
        return res.status(404).json({ 
          success: false, 
          message: 'Event not found' 
        });
      }

      // For approvals, check if already approved
      if (action === 'approve' && existingEvent.approved) {
        console.log('Event is already approved');
        return res.status(400).json({
          success: false,
          message: 'Event is already approved'
        });
      }
      
      if (action === 'approve') {
        console.log('Approving event...');
        const updateData = {
          approved: true,
          approvedBy: adminName || 'Admin',
          approvedAt: new Date()
        };
        
        // Use findOneAndUpdate to ensure atomic operation
        const event = await Event.findOneAndUpdate(
          { _id: id, approved: false }, // Only update if not already approved
          updateData,
          { new: true, runValidators: true }
        );
        
        if (!event) {
          console.log('Failed to approve event - may already be approved');
          return res.status(400).json({ 
            success: false, 
            message: 'Failed to approve event. It may already be approved.' 
          });
        }
        
        console.log('Event approved successfully');
        return res.status(200).json({ 
          success: true, 
          message: 'Event approved successfully',
          data: event 
        });
      } else if (action === 'reject') {
        console.log('Rejecting event...');
        // For rejection, we delete the event
        await Event.findByIdAndDelete(id);
        console.log('Event rejected and removed');
        return res.status(200).json({ 
          success: true, 
          message: 'Event rejected and removed' 
        });
      }
    }
    
    // Regular update operation (not approval-related)
    console.log('Processing regular update...');
    const updatedEvent = await Event.findByIdAndUpdate(
      id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!updatedEvent) {
      console.log('Event not found for update');
      return res.status(404).json({ 
        success: false, 
        message: 'Event not found' 
      });
    }
    
    console.log('Event updated successfully');
    return res.status(200).json({ 
      success: true, 
      data: updatedEvent 
    });
  } catch (error) {
    console.error('Error updating event:', error);
    
    // Handle validation errors
    if ((error as any).name === 'ValidationError') {
      const validationErrors = Object.values((error as any).errors).map((err: any) => err.message);
      return res.status(400).json({ 
        success: false, 
        message: 'Validation error', 
        errors: validationErrors 
      });
    }
    
    return res.status(500).json({ 
      success: false, 
      message: 'Error updating event', 
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

/**
 * DELETE handler to remove an event
 */
async function deleteEvent(
  req: NextApiRequest, 
  res: NextApiResponse, 
  id: string
) {
  try {
    const deletedEvent = await Event.findByIdAndDelete(id);
    
    if (!deletedEvent) {
      return res.status(404).json({ 
        success: false, 
        message: 'Event not found' 
      });
    }
    
    return res.status(200).json({ 
      success: true, 
      message: 'Event deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error deleting event', 
      error: (error as Error).message 
    });
  }
}
