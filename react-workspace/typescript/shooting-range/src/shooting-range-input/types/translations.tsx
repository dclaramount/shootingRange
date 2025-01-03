export const Translations = {
  "LoadingPlaceholder": "Loading...",
  "Loading": "Loading...",
  "ErrorPlaceHolderTab": "There was an error on the server, please try again later...",
  "ManagementDashboard": {
    'Title_Reservation_Management': 'Správa rezervací',
    'Title_Instructors_Management': 'Správa instruktorů',
    'Title_Blocking_Segments_Management': 'Správa událostí',
    'Title_Events': 'Nastavení',
    'Default_Select_Service': 'Vyberte střeliště',
    'Admin_Bookings': 'TODO: MAKE RESERVATIONS'
  },
  "EditBookingsTab": {
    "PopUpSummary": {
      "Title": "Summary",
      "TableHeaders": {
        "ShootingRange": "Střelnice",
        "DateAndTime": "Datum a čas",
        "Hours": "(h)",
        "ShootingPermit": "Zbrojní průkaz",
        "Instructor": "Instruktor",
        "Name": " Jméno a Příjmení",
        "Email": "E - mai",
        "Telephone": "Telefon",
        "Comments": "Poznámky"
      }
    },
    "PopUpDeletion": {
      "Title": "Delete Reservation",
      "Text": "Do you really want to cancel invoice: ",
      "DeleteButton": "Delete",
      "CancelButton": "Cancel"
    },
    "SumaryChangesPopUp": {
      "Title": "Summary",
      "TableHeaders": {
        "Field": "Fields",
        "Before": "Before",
        "After": "After"
      },
      "TableRows": {
        "UUIDInvoice": "Booking #",
        "LocationId": "Location Id",
        "Service": "Service",
        "StartTime": "Start Time",
        "Duration": "Duration (h)",
        "Instructor": "Instruktor (bez/s)",
        "ShootingPermit": "Shooting Permit",
        "Name": "Jméno a Příjmení",
        "Email": "E - mai",
        "Telephone": "Telefon"
      },
      "Comments": "Poznámky",
      "ModifyButton": "Modify",
      "CancelButton": "Cancel",
      "Loading": "Modifying..."
    }
  },
  "BookingManagmentTab": {
    "BlockWInstructor": 'Blok s instruktorem',
    "BlockWoutInstructor": 'Blok bez instruktora',
    "LegendWithComments": 'Rezervací s poznámkami'
  },
  "InstructorSegmentManagementCalendar": {
    "CreateSegmentPopUp": {
      "Title": "Vytvořte segment",
      "SubTitle_SelectInstructor": "Instruktor:",
      "SubTitle_Date": "Datum:",
      "SubTitle_SelectStartSegment": "Začátek bloku:",
      "SubTitle_SelectEndSegment": "Konec bloku:",
      "Create_Button": "Vytvořit",
      "Cancel_Button": "Zrušit"
    },
    "SubMenuSegment": {
      "Edit": "Upravit",
      "Delete": "Vymazat"
    },
    "EditSegmentPopUp": {
      "Title": "Rozdělit blok",
      "Start_of_the_blocking_segment": "Začátek bloku",
      "End_of_the_blocking_segment": "Konec bloku",
      "Modify_Button": "Upravit",
      "Cancel_Button": "Zrušit"
    },
    "DeleteSegmentPopUp": {
      "Disclaimer": "Jste si jistí že chcete smazat tento instruktorský blok?",
      "Delete_Button": "Vymazat",
      "Cancel_Button": "Zrušit"
    }
  },
  "BlockingSegment": {
    "SubMenuSegment": {
      "Delete": "Vymazat"
    },
    "DeleteSegmentPopUp": {
      "Disclaimer": "Jste si jistí že chcete vymazat tuto událost?",
      "Delete_Button": "Vymazat",
      "Cancel_Button": "Zrušit"
    },
    "CreateSegmentPopUp": {
      "Title": "Vytvořit událost",
      "SubTitle_SelectLocation": "Výběr lokace:",
      "SubTitle_NameOfSegment": "Název události:",
      "SubTitle_TypeOfEvent": "Typ události",
      "SubTitle_AllDay": "Celodenní událost",
      "Date": "Datum",
      "SubTitle_NotAllDay": "Část dne",
      "SubTitle_SelectStartSegment": "Začátek události:",
      "SubTitle_SelectEndSegment": "Konec události:",
      "Create_Button": "Vytvořit",
      "Cancel_Button": "Zrušit"
    },
  },
  "PostPoup": {
    "CloseButton": "Zrušit"
  },
  "CopyInstructorSegments": {
    "Title": "Copying Instructor Segments",
    "MainFromHeader": 'Current Week:',
    "MainToHeader": 'To Week:',
    "Headers": ['Select', 'UUID', 'Name', 'Time Segment', 'Name', 'TimeSegment'],
    "CopyButton": "Copy",
    "CloseButton": "Close",
    "LabelCopyWeek": "Copy Week",
    "ToWeek": "To Week:"
  },
  "CopyBlockSegments": {
    "Title": "Copying Blocking Segments",
    "MainFromHeader": 'Current Week:',
    "MainToHeader": 'To Week:',
    "Headers": ['Select', 'UUID', 'Name', 'Time Segment', 'Name', 'TimeSegment'],
    "CopyButton": "Copy",
    "CloseButton": "Close",
    "LabelCopyWeek": "Copy Week",
    "ToWeek": "To Week:"
  },
  "ConfirmedPassword": 'Napište heslo',
  "BookingDashboard": {
    'Free_Segment': 'Volno',
    'Partially_Occupied': 'Částečně',
    'FullyOccupied': 'Plně'
  },
  "SumaryBooking": {
    "Title": 'Shrnutí rezervace',
    "WithInstructor": 'S instruktorem',
    "WithoutInstructor": 'Bez instruktorem',
    "Terms_And_Conditions_Agree": 'Souhlasím s',
    "Terms_And_Contitions_Link": 'provozní řádem střelnice',
    "Button_Create": 'Vytvořit rezervaci'
  },
  "BookingCreated": {
    "Title": 'Rezervace byla úspěšně vytvořena.',
    "Disclaimer1": 'Na mail Vám během pár okamžiků přijde potvrzující e-mail. V případě jeho nenalezení zkontrolujte složku se spamem.',
    "Disclaimer2": 'Pokud problém přetrvá, kontaktujte prosím správce střelnice.',
    "Button_Close": 'Zavřít',
    "TitleError": 'Proces vytváření selhal',
    "ErrorDisclaimer": 'Proces vytváření Vaší rezervace selhal, prosím zkuste ji vytvořit znovu. Pokud bude problém přetrvávat kontaktujte podporu na info@strelniceprerov.cz, děkujeme.'
  },
  "BookingForm": {
    "ShootingPermit": {
      "Subtitle": 'Zbrojní průkaz',
      "Label": 'Čislo Zbrojní průkaz',
      "onError": 'Vyplňte prosím jako format ZP123456',
      "RegExValidation": '^[A-Z]{2}[0-9]{6}$'
    },
    "Instructor": {
      "Label": 'Instruktor'
    },
    "Personal_Information": 'Osobní údaje',
    "Name": {
      "Label": 'Jméno a příjmení',
      "onError": 'Vyplňte prosím Jméno a příjmení'
    },
    "Email": {
      "Label": 'Email',
      "onError": 'Vyplňte prosím email jako format jiri.prochazka@seznam.cz',
      "RegExValidation": '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$'
    },
    "PhoneNumber": {
      "Label": 'Telefon',
      "onError": 'Vyplňte prosím telefon na format +420123456789',
      "RegExValidation": '^\\+420[1-9][0-9]{8}$'
    },
    "Comments": {
      "Label": 'Poznámky'
    }
  }
}