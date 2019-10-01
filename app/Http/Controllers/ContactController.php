<?php

namespace App\Http\Controllers;

use App\Contact;
use App\Http\Traits\ControllerHelper;
use App\Rules\PhoneNumber;
use Illuminate\Http\Request;

class ContactController extends Controller
{

    use ControllerHelper;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $requests = Contact::query()
            ->orderBy('created_at', 'asc')
            ->paginate(10);
        return response()->json($requests);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     * @throws
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            /*'email' => 'required|email|unique:users,email',*/
            'email' => 'required|unique:users,email',
            /*'birth_date' => 'date',*/
            /*'telephone_1' => [
                new PhoneNumber
            ],
            'telephone_2' => [
                new PhoneNumber
            ],
            'telephone_3' => [
                new PhoneNumber
            ],*/
        ]);

        $contact = new Contact($this->filterRequest($request)->toArray());
        $contact->save();
        return response()->json($contact);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Contact $contact
     * @return \Illuminate\Http\Response
     */
    public function show(Contact $contact)
    {
        return response()->json($contact);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Contact $contact
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Contact $contact)
    {
        $this->validate($request, [
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            /*'email' => 'required|email|unique:users,email,' . $contact->id,*/
            'email' => 'required|unique:users,email,' . $contact->id,
            /*'birth_date' => 'date',*/
            /*'telephone_1' => [
                new PhoneNumber
            ],
            'telephone_2' => [
                new PhoneNumber
            ],
            'telephone_3' => [
                new PhoneNumber
            ],*/
        ]);
        $data = $this->filterRequest($request)->toArray();
        $data['telephone_1'] = '';
        $contact->update($data);
        return response()->json($contact);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Contact $contact
     * @return \Illuminate\Http\Response
     * @throws
     */
    public function destroy(Contact $contact)
    {
        $contact->delete();
        return response()->json();
    }

    public function reinstate($contactId)
    {
        $contact = Contact::withTrashed()
            ->find($contactId);
        $contact->restore();
        return response()->json();
    }

}
