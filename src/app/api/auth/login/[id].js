import { useRouter } from 'next/router';
import { connectDB } from '@/utils/database';
import User from '@/models/User';

export async function DELETE(req, res){
    const router = useRouter();
    const {eventId} = router.query;
    console.log('Event ID:', eventId);

    try {
        await connectDB();

        const deletedEvent = await User.findByIdAndDelete(eventId);

        if(!deletedEvent){
            return new Response(JSON.stringify({ message: 'Event not found'}), {status: 404});
        }

        return new Response(JSON.stringify({ message: 'Event deleted successfully'}), {status: 200});
        
    } catch (error) {
        return new Response(JSON.stringify({ message: error.message}), {status: 500});
    }
}
