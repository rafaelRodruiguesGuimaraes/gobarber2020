// import AppError from '@shared/errors/AppError';
import ListProviderMonthAvailability from './ListProviderMonthAvailability';
import FakeAppointsmentRepository from '../repositories/fakes/FakeAppointmentsRepository';

let listProviderMonthAvailability: ListProviderMonthAvailability;
let fakeAppointsmentRepository: FakeAppointsmentRepository;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeAppointsmentRepository = new FakeAppointsmentRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailability(
      fakeAppointsmentRepository,
    );
  });

  it('should be able to list all available days of the provider', async () => {
    await fakeAppointsmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppointsmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    await fakeAppointsmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 4, 21, 8, 0, 0),
    });

    const avaliability = await listProviderMonthAvailability.execute({
      provider_id: 'user',
      month: 5,
      year: 2020,
    });

    expect(avaliability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: false },
        { day: 21, available: true },
      ]),
    );
  });
});